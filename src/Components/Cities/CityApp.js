import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native';

import styles from '../../styles';
import Tabs from '../../routes';

const key = 'cities';

export default class CityApp extends Component {

  state = {
    cities : []
  }

  async componentDidMount(){
    try {
      const cities = await AsyncStorage.getItem(key)
      this.setState({
        cities : JSON.parse(cities)
      })
    } catch (e) {
      console.log('error: ', e)
    }
  }

  addCity = (city) => {
    const cities = this.state.cities;
    cities.push(city);
    AsyncStorage.setItem(key, JSON.stringify(cities))
      .then(() => console.log('item stored'))
    this.setState({ cities });
  }

  addLocation = (location, city) => {
    const index = this.state.cities.findIndex( item => {
      return item.id === city.id
    })
    console.log('index:::: ',index)
    console.log('this.state.cities:::: ',this.state.cities)
    const chosenCity = this.state.cities[index]
    console.log('chosenCity:::: ',chosenCity)
    chosenCity.locations.push(location)
    const cities = [
      ...this.state.cities.slice(0,index),
      chosenCity,
      ...this.state.cities.slice(index+1)
    ]
    this.setState({
      cities
    }, () => {
      AsyncStorage.setItem(key, JSON.stringify(cities))
        .then(() => console.log('item stored'))
        .catch(err => {
          console.log('error: ', err)
        })
    })
  }

  render() {
    return (
      <Tabs
        screenProps = {{
          cities : this.state.cities,
          addCity : this.addCity,
          addLocation : this.addLocation
        }}
      />
    ) 

  }
}
