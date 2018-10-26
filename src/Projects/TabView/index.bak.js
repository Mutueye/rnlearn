import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated
} from 'react-native';
import { 
  TabView,
  TabBar,
  SceneMap
} from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'

import Constants from '../../utils/Constants';

const styles = StyleSheet.create({
  statusbar: {
    height: Constants.statusBarHeight,
    width: '100%',
    backgroundColor: '#f9f9f9'
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    width: '100%'
  },
  header: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ffffff'
  },
  tabStyle: {
    height: 60
  },
  labelStyle: {
    margin: 0,
    color: '#222222'
  }
});

export default class Index extends Component {

  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
    ]
  };
  
  _handleIndexChange = index => this.setState({ index });

  _renderTabBar = props => {
    return (
      <TabBar 
        {...props} 
        labelStyle={styles.labelStyle}
        renderIndicator={this._renderIndicator}
        tabStyle={styles.tabStyle}
        style={styles.header} 
      />
    )
  };

  _firstRoute = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} >
    <MaterialIcons
      name='search' 
      size={22} 
      color='#bbb'
    />
  </View>;

  _secondRoute = () => <View style={{flex: 1, backgroundColor: '#673ab7'}} />;

  _renderScene = SceneMap({
    first: this._firstRoute,
    second: this._secondRoute
  });
  
  _renderIndicator = props => {
    const { width, position, navigationState } = props;
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
        style={{
          position: 'absolute',
          left: 0,
          bottom: 3,
          right: 0,
          height: 2,
          backgroundColor: '#0c80e8',
          width: 30,
          marginLeft: 0.5*(width - 30),
          transform: [{ translateX }] 
        }}
      />
    );
  }

  render() {
    return (
      <View style={[styles.wrapper, {backgroundColor: '#ffffff'}]}>
        <StatusBar
          animated={true}
          hidden={false}
          backgroundColor={'transparent'}
          translucent={true}
          barStyle='dark-content'/>
        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
          initialLayout={{
            width: Constants.screenWidth,
            height: 0
          }}
        />
      </View>
    )
  }
}
