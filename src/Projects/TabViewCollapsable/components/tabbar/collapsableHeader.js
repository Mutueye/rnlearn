import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated
} from 'react-native';

import Colors from '../../../../utils/Colors';
import Constants, { rem } from '../../../../utils/Constants';

const COLLAPSABLE_HEIGHT = 200*rem
const COLLAPSABLE_ZINDEX = 100

export default class CollapsableHeader extends Component {
  
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
    zIndex: COLLAPSABLE_ZINDEX
  },
  topbar: {
    width: '100%',
    height: COLLAPSABLE_HEIGHT,
    backgroundColor: Colors.theme,
  }
});