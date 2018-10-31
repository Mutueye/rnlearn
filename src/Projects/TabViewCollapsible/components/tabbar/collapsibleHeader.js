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
      <Animated.View style={[styles.container, this.props.collapseAnimCtrl.getCollapseTransform()]}>
        <View style={styles.topbar} />
        {this.props.renderTabBar()}
      </Animated.View>
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