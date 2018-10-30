import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated
} from 'react-native';
import { TabBar } from 'react-native-tab-view';

import Constants, { rem } from '../../../../utils/Constants'
import Colors from '../../../../utils/Colors'

const styles = StyleSheet.create({
  tabStyle: {
    height: Constants.tabBarHeight
  },
  labelStyle: {
    margin: 0,
    fontSize: Constants.fsize_tabbar,
    color: Colors.f_title
  },
  barStyle: {
    backgroundColor: Colors.white,
    height: Constants.tabBarHeight,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomColor: Colors.line
  }
});

const renderIndicator = props => {
  const { 
    width, 
    position, 
    navigationState,
    indicatorStyle,
    indicatorWidth = 20*rem,
    indicatorFullWidth = false,
    indicatorSpace = Constants.commonSpace
  } = props;
  const translateX = Animated.multiply(
    position.interpolate({
      inputRange: [0, navigationState.routes.length - 1],
      outputRange: [0, navigationState.routes.length - 1],
      extrapolate: 'clamp',
    }),
    width
  );
  return (
    <Animated.View
      style={[{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 3*rem,
        height: 2*rem,
        backgroundColor: Colors.theme,
        width: indicatorFullWidth ? width - 2*indicatorSpace : indicatorWidth,
        marginLeft: indicatorFullWidth ? indicatorSpace : 0.5*(width - indicatorWidth),
        transform: [{ translateX }] 
      }, indicatorStyle]}
    />
  );
}

const Tabbar = props => {
  
  const {
    hasBottomLine = true,
    padHorizontal = Constants.commonSpace,
    tabStyle,
    barStyle
  } = props
  
  tabbarStyle = [
    styles.barStyle,
    barStyle,
    {
      borderBottomWidth: hasBottomLine ? StyleSheet.hairlineWidth : 0
    }
  ]

  return (
    <TabBar 
      {...props} 
      labelStyle={styles.labelStyle}
      renderIndicator={renderIndicator}
      tabStyle={[styles.tabStyle, tabStyle]}
      style={tabbarStyle}
    />
  )
};

export default Tabbar

