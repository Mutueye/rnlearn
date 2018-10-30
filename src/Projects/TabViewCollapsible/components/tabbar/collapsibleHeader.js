import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated
} from 'react-native';

import Colors from '../../../../utils/Colors';
import Constants, { rem } from '../../../../utils/Constants';
import Variables from '../../variables'

export default class CollapsibleHeader extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topbar} />
        {this.props.renderTabBar()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    zIndex: 100
  },
  topbar: {
    width: '100%',
    height: Variables.collapsibleHeight,
    backgroundColor: Colors.theme,
  }
});