import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import Constants from '../../utils/Constants';
import Colors from '../../utils/Colors';
import List from './components/List';
import Header from './components/header';
import Tabbar from './components/tabbar';
import CollapsibleHeader from './components/tabbar/collapsibleHeader'
import CollapsibleProvider from './collapsibleProvider'

export default class Index extends Component {

  state = {
    index: 0,
    currentTabKey: 'first',
    routes: [
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
      { key: 'third', title: 'Third'}
    ]
  };
  
  _handleIndexChange = (index, collapseAnimCtrl, canJumpToTab) => {
    if(canJumpToTab) {
      if(this.state.routes[index].key != this.state.currentTabKey) {
        collapseAnimCtrl.onTabChange(this.state.routes[index], this.state.currentTabKey);
      }
      this.setState({
        currentTabKey: this.state.routes[index].key,
        index
      });
    }
  }
  
  _renderHeader = (collapseAnimCtrl) => props => (
    <CollapsibleHeader 
      collapseAnimCtrl={collapseAnimCtrl}
      renderTabBar={() => (
        <Tabbar
          onTabPress={({route}) => {
            /*
            if(route.key != this.state.currentTabKey) {
              //console.log('on TabPress currentTabKey is', this.state.currentTabKey)
              //collapseAnimCtrl.stopCurrentScrolling(this.state.currentTabKey);
              collapseAnimCtrl.stopCurrentScrolling(this.state.currentTabKey);
              //collapseAnimCtrl.syncScrollY();
            }*/
          }}
          {...props}
        />
      )}
    />
  );

  _renderScene = SceneMap({
    first: () => <List listLength={30} route={this.state.routes[0]}/>,
    second: () => <List listLength={20} route={this.state.routes[1]} />,
    third: () => <List listLength={2} route={this.state.routes[2]} />
  });

  render() {
    return (
      <CollapsibleProvider currentTabKey={this.state.currentTabKey} routes={this.state.routes}>
        {
          (collapseAnimCtrl, { canJumpToTab }) => (
            <View style={styles.wrapper}>
              <Header title="顶部栏可折叠的标签页" isAbsoulte={true} hasBottomLine={true} />
              <TabView
                navigationState={this.state}
                renderScene={this._renderScene}
                renderTabBar={this._renderHeader(collapseAnimCtrl)}
                onIndexChange={index => this._handleIndexChange(index, collapseAnimCtrl, canJumpToTab)}
                initialLayout={{ width: Constants.screenWidth, height: 0 }}
              />
            </View>
          )
        }
      </CollapsibleProvider>
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
  barStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0
  }
});
