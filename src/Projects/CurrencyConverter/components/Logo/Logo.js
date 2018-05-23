import React from 'react';
import {
  View,
  Image,
  ImageBackground,
  Text
} from 'react-native'

import styles from './styles'

const Logo = () => (
  <View style={styles.container}>
    <View style={styles.iconContainer}>
      <Image resizeMode="contain" style={styles.backgroundImg} source={require('./images/background.png')} />
      <Image resizeMode="contain" style={styles.logoImg} source={require('./images/logo.png')} />
    </View>
    <Text style={styles.text}>Currency Converter</Text>
  </View>
)

export default Logo
