import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import Constants from '../../utils/Constants';
import Colors from '../../utils/Colors';
import List from './components/List';
import Tabbar from './components/tabbar';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    backgroundColor: Colors.white
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

  _renderScene = SceneMap({
    first: () => <List listLength={30} tabIndex={0}/>,
    second: () => <List listLength={20} tabIndex={1} />
  });

  render() {
    return (
      <View style={styles.wrapper}>
        <StatusBar
          animated={true}
          hidden={false}
          backgroundColor={'transparent'}
          translucent={true}
          barStyle='dark-content'/>
        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={props => <Tabbar {...props} />}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{
            width: Constants.screenWidth,
            height: 0
          }}/>
      </View>
    )
  }
}
