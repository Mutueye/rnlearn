import React from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import CollapseAnimCtrl from './collapseAnimCtrl';
import { CollapsibleContext } from './collapsibleContext';

export default class CollapsibleProvider extends React.Component {
  
  constructor(props) {
    super(props);

    this.collapseAnimCtrl = new CollapseAnimCtrl({
      scrollToOffset: (scrollOptions) => {
        console.log(scrollOptions.tabKey, ' scrollTo ', scrollOptions.offset)
        let tabKey = scrollOptions.tabKey ? scrollOptions.tabKey : this.props.currentTabKey;
        let scrollToOffset = this._scrollHandlers[tabKey]['scrollToOffset'];
        scrollToOffset && scrollToOffset(scrollOptions.offset, scrollOptions.animated);
      },
      saveLastScrollY: (tabKey) => {
        console.log('saveLastScrollY:::', tabKey);
        let _tabKey = tabKey && tabKey != '' ? tabKey : this.props.currentTabKey;
        let saveLastScrollY = this._scrollHandlers[tabKey]['saveLastScrollY'];
        saveLastScrollY && saveLastScrollY(); 
      },
      loadLastScrollY: (tabKey) => {
        console.log('loadLastScrollY:::', tabKey);
        let _tabKey = tabKey && tabKey != '' ? tabKey : this.props.currentTabKey;
        let loadLastScrollY = this._scrollHandlers[tabKey]['loadLastScrollY'];
        loadLastScrollY && loadLastScrollY(); 
      }
    });

    this.state = {
      currentTabKey: null,
      canJumpToTab: true,
      contextProvider: {
        collapseAnimProps: this.collapseAnimCtrl.collapseAnimProps,
        addScrollHandler: this._addScrollHandler
      }
    };
  }

  componentWillUnmount() {
    this.collapseAnimCtrl.destroy();
  }
  
  _scrollHandlers = {};
  _addScrollHandler = (tabKey, name, handlerFunction) => {
    if(!this._scrollHandlers[tabKey]) this._scrollHandlers[tabKey] = {};
    this._scrollHandlers[tabKey][name] = handlerFunction;
  };

  render() {
    return (
      <CollapsibleContext.Provider value={this.state.contextProvider}>
        { this.props.children(this.collapseAnimCtrl) }
      </CollapsibleContext.Provider>
    );
  }
}