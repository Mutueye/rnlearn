import React from 'react';

import Colors from '../styles/Colors';

import AddCity from '../Components/AddCity/AddCity';
import Cities from '../Components/Cities/Cities';
import City from '../Components/Cities/City';

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

const CitiesNav = createStackNavigator({
  Cities : { screen : Cities },
  City : { screen : City }
}, {
  navigationOptions : {
    headerStyle : {
      backgroundColor : Colors.blue,
      borderBottomWidth : 0
    },
    headerTitleStyle : {
      fontSize : 20
    },
    headerTintColor : '#ffffff'
  }
});

const Tabs = createBottomTabNavigator({
  Cities : { screen : CitiesNav },
  AddCity : { screen : AddCity }
});

export default Tabs;
