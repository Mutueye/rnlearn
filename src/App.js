import React, { Component } from 'react';

import CityApp from './Projects/CityApp'
import RNFlatList from './Projects/RNFlatList'
import RNRedux from './Projects/RNRedux'
import CurrencyConverter from './Projects/CurrencyConverter'
import TabView from './Projects/TabView'
import CollapsableTabView from './Projects/CollapsableTabView'
import GestureHandler from './Projects/GestureHandler'
import TabViewCollapsible from './Projects/TabViewCollapsible'
import CollapsibleTab from './Projects/CollapsibleTab'
import ScrollViewTest from './Projects/ScrollViewTest'
import NestedTabView from './Projects/NestedTabView'
import RichText from './Projects/RichText'

export default class App extends Component {
  render() {
    return <CollapsibleTab />
  }
}
