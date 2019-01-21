import React, { Component } from 'react';
import { View, Text, ScrollView, StatusBar, StyleSheet, Animated, PanResponder, RefreshControl } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import _ from 'lodash'

import Constants from '../../../../utils/Constants';
import Colors from '../../../../utils/Colors';
import Tabbar from '../tabbar';
import TabContent from './tabContent'

export default class Index extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Tab2_1' },
        { key: 'second', title: 'Tab2_2' },
        { key: 'third', title: 'Tab2_3'}
      ]
    };
  }

  _handleIndexChange = (index) => this.setState({index})
  
  _renderTabBar = props => <Tabbar {...props}/>;

  _renderScene = ({route, navigationState}) => {
    switch(route.key) {
      case 'first':
        return <TabContent name={'1'} />
      case 'second':
        return <TabContent name={'2'} />
      case 'third':
        return <TabContent name={'3'} />
      default:
        return null
    }
  }

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={index => this._handleIndexChange(index)}
        initialLayout={{ width: Constants.screenWidth, height: 0 }}
      />
    )
  }
}
