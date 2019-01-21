import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native'

export default class ScrollViewTest extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ScrollView bounces={false}>
        <View style={{height: 300, backgroundColor: '#ff00ff'}} />
        <ScrollView style={{height:300}} bounces={false}>
          <View style={{height: 200, backgroundColor: '#ffff00'}} />
          <View style={{height: 200, backgroundColor: '#00ffff'}} />
        </ScrollView>
        <View style={{height: 300, backgroundColor: '#ff00ff'}} />
      </ScrollView>
    )
  }
}
