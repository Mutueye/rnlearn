import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  PixelRatio
} from 'react-native'

import Colors from '../../styles/Colors'
import CenterMessage from '../CenterMessage/CenterMessage'

export default class City extends Component {

  static navigationOptions = (props) => {
    return {
      title : props.navigation.state.params.city.city
    }
  };

  state = {
    name : '',
    info : ''
  }

  onChangeText = (key,value) => {
    this.setState({
      [key] : value
    })
  }

  addLocation = () => {
    if(this.state.name === '' || this.state.info === '') return
    const { city } = this.props.navigation.state.params
    const location = {
      name : this.state.name,
      info : this.state.info
    }
    this.props.screenProps.addLocation(location, city)
    this.setState({
      name : '',
      info : ''
    })
  }

  render() {
    const { city } = this.props.navigation.state.params
    return (
      <View style={{flex:1}}>
        <ScrollView style={styles.locationList}>
          {
            !city.locations.length && (<CenterMessage message='No Locations' />)
          }
          {
            city.locations.map((location, index) => (
              <View style={styles.locationItem}>
                <Text style={styles.locationName}>{location.name}</Text>
                <Text style={styles.locationInfo}>{location.info}</Text>
              </View>
            ))
          }
        </ScrollView>
        <TextInput
          value = {this.state.name}
          placeholder = 'Location name'
          onChangeText = { val => this.onChangeText('name', val) }
          style= {styles.input}
          underlineColorAndroid ={'transparent'}
          placeholderTextColor = {Colors.f_placeholder}
        />
        <TextInput
          value = {this.state.info}
          placeholder = 'Location info'
          onChangeText = { val => this.onChangeText('info', val) }
          style= {[styles.input, styles.input2]}
          underlineColorAndroid ={'transparent'}
          placeholderTextColor = {Colors.f_placeholder}
        />
        <View style = {styles.buttonContainer}>
          <TouchableOpacity onPress = {this.addLocation}>
            <View style = {styles.button}>
              <Text style = {styles.buttonText}>Add Location</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  locationList : {
    position : 'absolute',
    top : 0,
    left : 0,
    right : 0,
    bottom : 160,
    backgroundColor : 'white'
  },
  locationItem : {
    paddingVertical : 10,
    marginHorizontal : 10,
    borderBottomWidth : 1/PixelRatio.get(),
    borderBottomColor : Colors.l_high
  },
  locationName : {
    fontSize : 16,
    fontWeight : 'bold',
    color : Colors.f_title
  },
  locationInfo : {
    fontSize : 12,
    color : Colors.f_body
  },
  input : {
    position : 'absolute',
    backgroundColor : 'white',
    height : 40,
    bottom : 110,
    left : 10,
    right : 10,
    paddingHorizontal : 8
  },
  input2 : {
    bottom : 60
  },
  button : {
    backgroundColor : Colors.blue,
    height : 40,
    justifyContent : 'center',
    alignItems : 'center'
  },
  buttonContainer : {
    position : 'absolute',
    bottom : 10,
    left : 10,
    right : 10
  },
  buttonText : {
    color : 'white',
    fontSize : 16
  }
});
