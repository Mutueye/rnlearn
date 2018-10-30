import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import Constants from '../../utils/Constants';
import Colors from '../../utils/Colors';
import List from './components/List';
import Header from './components/header';
import Tabbar from './components/tabbar';
import CollapsableHeader from './components/tabbar/collapsableHeader'

export default class Index extends Component {

  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
    ]
  };

  _renderScene = SceneMap({
    first: () => <List listLength={30} tabIndex={0}/>,
    second: () => <List listLength={20} tabIndex={1} />
  });

  render() {
    return (
      <View style={styles.wrapper}>
        <Header title="顶部栏可伸缩的标签页" isAbsoulte={true} hasBottomLine={true} />
        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={props => <CollapsableHeader renderTabBar={()=><Tabbar {...props} />} />}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{
            width: Constants.screenWidth,
            height: 0
          }}/>
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
  barStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0
  }
});
