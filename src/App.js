import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import CityApp from './Projects/CityApp'
import RNFlatList from './Projects/RNFlatList'
import RNRedux from './Projects/RNRedux'

export default class App extends Component {
  render() {
    return <RNRedux />
  }
}
