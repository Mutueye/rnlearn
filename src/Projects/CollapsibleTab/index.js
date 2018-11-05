import React, { Component } from 'react';
import { View, Text, ScrollView, StatusBar, StyleSheet, Animated, PanResponder, RefreshControl } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import Constants from '../../utils/Constants';
import Variables from './variables';
import Colors from '../../utils/Colors';
import List from './components/List';
import Header from './components/header';
import Tabbar from './components/tabbar';
import CollapsibleHeader from './components/tabbar/collapsibleHeader';

const collapsibleDistance = Variables.collapsibleHeight - Constants.headerHeight - Constants.statusBarHeight;

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
      ],
      contentHeight: 0
    };
    
    this.scrollY = new Animated.Value(0);

  }

  _handleIndexChange = (index) => {
    this.setState({
      currentTabKey: this.state.routes[index].key,
      index
    });
  }
  
  _renderTabBar = props => <Tabbar {...props}/>;

  _renderScene = ({route, navigationState}) => {
    switch(route.key) {
      case 'first':
        return (
          <List 
            listLength={30} 
            route={this.state.routes[0]} 
            currentTabKey={this.state.currentTabKey}
            setContentHeight={this._setContentHeight}
            scrollRef={this._scrollView}
            collapsibleDistance={collapsibleDistance}
            scrollY={this.scrollY}
          />
        )
      case 'second':
        return (
          <List 
            listLength={20} 
            route={this.state.routes[1]} 
            currentTabKey={this.state.currentTabKey}
            setContentHeight={this._setContentHeight}
            scrollRef={this._scrollView}
            collapsibleDistance={collapsibleDistance}
            scrollY={this.scrollY}
          />
        )
      case 'third':
        return (
          <List 
            listLength={2} 
            route={this.state.routes[2]} 
            currentTabKey={this.state.currentTabKey}
            setContentHeight={this._setContentHeight}
            scrollRef={this._scrollView}
            collapsibleDistance={collapsibleDistance}
            scrollY={this.scrollY}
          />
        )
      default:
        return null
    }
  }
  
  _setContentHeight = (height) => {
    this.setState({contentHeight: height});
  };

  render() {
    const contentStyle = [styles.content, {
      height: this.state.contentHeight
    }]
    
    const innerStyle = [styles.inner, {
      transform: [
        {
          translateY: this.scrollY.interpolate({
            inputRange: [0, collapsibleDistance],
            outputRange: [0, -1*collapsibleDistance],
            extrapolate: 'clamp'
          })
        }
      ]
    }]
    
    return (
      <View style={styles.wrapper}>
        <Header title="顶部栏可折叠的标签页" isAbsoulte={true} hasBottomLine={true} />
        <ScrollView
          contentContainerStyle={contentStyle}
          style={styles.container}
          scrollEventThrottle={1}
          ref={(scrollView) => { this._scrollView = scrollView; }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollY } } } ],
            { 
              //如果useNativeDriver=true, Animate.event()返回的不是函数，ScrollView报错
              //如果使用Animated.View，是可以为true的，但此时又出现ref无法
              //获取的BUG，真操蛋
              useNativeDriver: false,
            }
          )}
          showsVerticalScrollIndicator={true}
          stickyHeaderIndices={[0]}
          bounces={false}>
          <View style={{width: '100%', flex:1}}>
            <Animated.View style={innerStyle}>
              <View style={styles.collapsableBar} />
              <View style={styles.tabview}>
                <TabView
                  navigationState={this.state}
                  renderScene={this._renderScene}
                  renderTabBar={this._renderTabBar}
                  onIndexChange={index => this._handleIndexChange(index)}
                  initialLayout={{ width: Constants.screenWidth, height: 0 }}
                />
              </View>
            </Animated.View>
          </View>
        </ScrollView>

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
  },
  inner: {
    width: '100%',
    height: 'auto'
  },
  collapsableBar: {
    height: Variables.collapsibleHeight,
    width: '100%'
  },
  content: {
    width: '100%',
  },
  tabview: {
    height: Constants.screenHeight - Constants.headerHeight - Constants.statusBarHeight
  }
});
