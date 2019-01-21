import React, { Component } from 'react';
import { View, Text, ScrollView, StatusBar, StyleSheet, Animated, PanResponder, RefreshControl } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import Constants from '../../utils/Constants';
import Colors from '../../utils/Colors';
import Header from './components/header';
import Tabbar from './components/tabbar';
import Tab1 from './components/innerTabs/tab1'
import Tab2 from './components/innerTabs/tab2'

export default class Index extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
        { key: 'third', title: 'Third'}
      ]
    };
  }

  _handleIndexChange = (index) => this.setState({index});
  
  _renderTabBar = props => <Tabbar {...props}/>;

  _renderScene = ({route, navigationState}) => {
    switch(route.key) {
      case 'first':
        return <Tab1 />
      case 'second':
        return <Tab2 />
      case 'third':
        return (
          <View style={{height: 200, backgroundColor: '#ff00ff'}}><Text>3</Text></View>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Header title="嵌套的TabView" isAbsoulte={false} hasBottomLine={true} />
        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={index => this._handleIndexChange(index)}
          initialLayout={{ width: Constants.screenWidth, height: 0 }}/>
        <View>
          <Text>123123</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 400,
    flexDirection: 'column',
    width: '100%',
    backgroundColor: Colors.white
  }
});
