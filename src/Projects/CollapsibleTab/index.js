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

  
  
  constructor(props) {
    super(props)
    
    this.state = {
      index: 0,
      currentTabKey: 'first',
      routes: [
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
        { key: 'third', title: 'Third'}
      ]
    };
    
    this.scrollY = new Animated.Value(0);
    this.scrollY.addListener(this._updateScroll);
  }
  
  _updateScroll = ({value}) => {
    console.log(value)
  };
  
  _handleIndexChange = (index) => {
    this.setState({
      currentTabKey: this.state.routes[index].key,
      index
    });
  }
  
  _renderHeader = props => <Tabbar {...props}/>;

  _renderScene = SceneMap({
    first: () => <List listLength={30} route={this.state.routes[0]} />,
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
        <Animated.ScrollView
          contentContainerStyle={styles.content}
          style={styles.container}
          scrollEventThrottle={1}
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.scrollY } } } ],
              { 
                useNativeDriver: true,
                //listener: (evt) => console.log(evt.nativeEvent.contentOffset)
              }
            )
          }
          showsVerticalScrollIndicator={true}
          stickyHeaderIndices={[0]}>
          <View style={styles.inner}>
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
          </View>
          <View style={{width: '100%', height: 1000, backgroundColor: '#ff00ff'}}></View>
        </Animated.ScrollView>

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
  container: {
    width: '100%',
    backgroundColor: 'transparent',
    flex:1
    //height: Constants.screenHeight + Variables.collapsibleHeight - Constants.headerHeight - Constants.statusBarHeight
  },
  inner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  collapsableBar: {
    height: Variables.collapsibleHeight,
    width: '100%'
  },
  content: {
    width: '100%',
    height: 9999
  },
  tabview: {
    height: Constants.screenHeight - Constants.headerHeight - Constants.statusBarHeight
  }
});
