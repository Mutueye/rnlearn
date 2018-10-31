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
    ]
  };
  
  _handleIndexChange = (index) => {
    this.setState({
      currentTabKey: this.state.routes[index].key,
      index
    });
  }
  
  _renderHeader = (collapseAnimCtrl) => props => (
    <CollapsibleHeader 
      collapseAnimCtrl={collapseAnimCtrl}
      renderTabBar={() => (
        <Tabbar
          onTabPress={({route}) => {
            console.log('scrollY::::::',collapseAnimCtrl.scrollY._value)
            collapseAnimCtrl.initialState.scrollToOffset({tabKey: this.state.currentTabKey, offset: collapseAnimCtrl.scrollY._value, animated: false})
            if(route.key != this.state.currentTabKey) {
              collapseAnimCtrl.onTabPress(route);
            }
          }}
          {...props}
        />
      )}
    />
  );

  _renderScene = SceneMap({
    first: () => <List listLength={30} route={this.state.routes[0]}/>,
    second: () => <List listLength={20} route={this.state.routes[1]} />
  });

  render() {
    return (
      <CollapsibleProvider currentTabKey={this.state.currentTabKey}>
        {
          (collapseAnimCtrl) => (
            <View style={styles.wrapper}>
              <Header title="顶部栏可折叠的标签页" isAbsoulte={true} hasBottomLine={true} />
              <TabView
                navigationState={this.state}
                renderScene={this._renderScene}
                renderTabBar={this._renderHeader(collapseAnimCtrl)}
                onIndexChange={index => this._handleIndexChange(index)}
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
