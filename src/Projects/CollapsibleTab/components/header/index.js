import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar
} from 'react-native';
import Color from 'color';

import Colors from '../../../../utils/Colors';
import Constants, { rem } from '../../../../utils/Constants';

export default class Header extends Component {
  
  static defaultProps = {
    statusBarStyle: 'dark-content',
    isAbsoulte: false,
    hasBottomLine: false
  }
  
  render() {
    
    const containerStyle = [styles.container]
    if(this.props.isAbsoulte) containerStyle.push(styles.containerAbs)
    if(this.props.hasBottomLine) containerStyle.push(styles.bottomLine)
    if(this.props.containerStyle) containerStyle.push(this.props.containerStyle)
    
    return (
      <View style={containerStyle}>
        <StatusBar
          animated={true}
          hidden={false}
          backgroundColor={'transparent'}
          translucent={true}
          barStyle={this.props.statusBarStyle}/>
        <View style={styles.content}>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Constants.statusBarHeight + Constants.headerHeight,
    width: '100%',
    backgroundColor: Color(Colors.white).fade(0.05),
  },
  bottomLine: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.line
  },
  containerAbs: {
    position: 'absolute', 
    left: 0,
    right: 0,
    top: 0,
    zIndex: Constants.zIndexHeader
  },
  content: {
    flexDirection: 'row',
    width: '100%',
    marginTop: Constants.statusBarHeight,
    height: Constants.headerHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 16*rem,
    color: Colors.f_title
  }
});