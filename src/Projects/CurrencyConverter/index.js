import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import Home from './screens/Home'

EStyleSheet.build({
  $PrimaryBlue : '#377df6',
  $white : '#ffffff',
  $border : '#e0e0e9',
  $inputText: '#797979',
  $lightGray: '#f0f0f0'
})

export default () => <Home />
