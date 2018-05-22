import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  PixelRatio
} from 'react-native'

import Colors from '../../styles/Colors'
import CenterMessage from '../CenterMessage/CenterMessage'

export default class Cities extends Component {

  static navigationOptions = {
    title: 'Cities'
  };

  viewCity = (city) => {
    //console.log('city: ',city);
    this.props.navigation.navigate('City', { city });
  }

  render() {
    return (
      <ScrollView>
        <View>
          {
            !this.props.screenProps.cities.length && (<CenterMessage message='No Cities' />)
          }
          {
            this.props.screenProps.cities.map((city, index) => (
              <View key = {city.id}>
                <TouchableOpacity onPress={() => this.viewCity(city)}>
                  <View style={styles.cityContainer}>
                    <Text style={styles.city}>{city.city}</Text>
                    <Text style={styles.country}>{city.country}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          }
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  cityContainer : {
    padding : 10,
    borderBottomWidth : 1/PixelRatio.get(),
    borderBottomColor : Colors.l_high,
    backgroundColor : 'white'
  },
  city : {
    fontSize : 20,
    paddingBottom : 4,
    color : Colors.f_title
  },
  country : {
    fontSize : 14,
    color : Colors.f_body
  }
});
