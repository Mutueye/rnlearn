import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import uuidV4 from 'uuid/v4';

import Colors from '../../styles/Colors';

export default class AddCity extends Component {

  state = {
    city : '',
    country : ''
  };

  onChangeText = (key, value) => {
    this.setState({
      [key] : value
    });
  };

  submit = () => {
    if(this.state.city === '' || this.state.country === '') {
      return;
    }
    const city = {
      city : this.state.city,
      country : this.state.country,
      locations : [],
      id : uuidV4()
    };
    this.props.screenProps.addCity(city);
    this.setState({
      city : '',
      country : ''
    }, () => {
      this.props.navigation.navigate('Cities');
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          City App
        </Text>
        <TextInput
          onChangeText = { val => this.onChangeText('country',val) }
          style={ styles.input }
          value={ this.state.country }
          underlineColorAndroid ={'transparent'}
          placeholder={ 'Country' }
        />
        <TextInput
          onChangeText = { val => this.onChangeText('city',val) }
          style={styles.input}
          value={this.state.city}
          underlineColorAndroid ={'transparent'}
          placeholder={'City'}
        />
        <TouchableOpacity onPress={this.submit}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add City</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input : {
    backgroundColor : 'white',
    marginBottom : 10,
    marginLeft : 10,
    marginRight : 10,
    paddingHorizontal : 8,
    height : 40
  },
  button : {
    height : 40,
    backgroundColor : Colors.blue,
    justifyContent : 'center',
    alignItems : 'center',
    marginBottom : 10,
    marginLeft : 10,
    marginRight : 10
  },
  buttonText : {
    color : 'white'
  },
  container : {
    backgroundColor : Colors.b_main,
    flex: 1,
    justifyContent : 'center'
  },
  heading : {
    fontSize : 30,
    textAlign : 'center',
    margin : 20,
    color : Colors.f_title
  }
});
