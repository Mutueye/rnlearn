import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  PixelRatio
} from 'react-native'

import Colors from '../../styles/Colors'

export default ({ message }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{ message }</Text>
  </View>
)

const styles = StyleSheet.create({
  container : {
    padding : 10,
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  text : {
    color : Colors.f_assist,
    fontSize : 18
  }
})
