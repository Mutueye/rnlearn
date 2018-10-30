import React, { Component } from 'react';

import CityApp from './Projects/CityApp'
import RNFlatList from './Projects/RNFlatList'
import RNRedux from './Projects/RNRedux'
import CurrencyConverter from './Projects/CurrencyConverter'
import TabView from './Projects/TabView'
import CollapsableTabView from './Projects/CollapsableTabView'
import GestureHandler from './Projects/GestureHandler'
import TabViewCollapsable from './Projects/TabViewCollapsable'

export default class App extends Component {
  render() {
    return <TabViewCollapsable />
  }
}
