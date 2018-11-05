import React, { Component } from 'react';
import { View, Text, ScrollView, StatusBar, StyleSheet, Animated, PanResponder } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import Constants from '../../utils/Constants';
import Variables from './variables';
import Colors from '../../utils/Colors';
import List from './components/List';
import Header from './components/header';
import Tabbar from './components/tabbar';
import CollapsibleHeader from './components/tabbar/collapsibleHeader'

export default class Index extends Component {

  state = {
    index: 0,
    currentTabKey: 'first',
    routes: [
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
      { key: 'third', title: 'Third'}
    ],
    pan: {
      x: 0,
      y: 0
    }, 
    scroll: false
  };
  
  _handleIndexChange = (index) => {
    this.setState({
      currentTabKey: this.state.routes[index].key,
      index
    });
  }
  
  _renderHeader = props => <Tabbar {...props}/>;

  _renderScene = SceneMap({
    first: () => <List listLength={30} route={this.state.routes[0]}/>,
    second: () => <List listLength={20} route={this.state.routes[1]} />,
    third: () => <List listLength={2} route={this.state.routes[2]} />
  });
  
  _onMomentumScrollBegin = () =>  {
    return console.log('begin::::');
  };
  
  _onMomentumScrollEnd = () => {
    return console.log('end::::');
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Header title="顶部栏可折叠的标签页" isAbsoulte={true} hasBottomLine={true} />
        <Animated.View
          onStartShouldSetResponder={ (evt, gestureState) => false}
          onStartShouldSetResponderCapture={(evt, gestureState) => false}
          onMoveShouldSetResponder={(evt, gestureState) => false}
          onMoveShouldSetResponderCapture={ (evt, gestureState) => false}
          onResponderGrant={() => this.setState({scroll: false})}
          onResponderMove={(evt) => console.log(evt.target, evt.nativeEvent, evt.touchHistory)
            /*Animated.event(
              [null, {dx: this.state.pan.x, dy: this.state.pan.y}],
              {
                listener: (e)=> {
                  console.log('NativeEvent:;::', e.nativeEvent)
                }
              }
            )*/
          }
          onResponderRelease={() => this.setState({scroll: true})}
          style={styles.container}
          >
          <View style={styles.collapsableBar} />
          <View style={styles.tabview}>
            <TabView
              navigationState={this.state}
              renderScene={this._renderScene}
              renderTabBar={this._renderHeader}
              onIndexChange={index => this._handleIndexChange(index)}
              initialLayout={{ width: Constants.screenWidth, height: 0 }}
            />
          </View>
        </Animated.View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    backgroundColor: Colors.white
  },
  collapsableBar: {
    height: Variables.collapsibleHeight,
    width: '100%'
  },
  container: {
    width: '100%',
    backgroundColor: '#ff00ff',
    flex:1
    //height: Constants.screenHeight + Variables.collapsibleHeight - Constants.headerHeight - Constants.statusBarHeight
  },
  tabview: {
    height: Constants.screenHeight - Constants.headerHeight - Constants.statusBarHeight
  }
});
