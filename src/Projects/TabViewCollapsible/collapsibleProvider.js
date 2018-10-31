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
        let tabKey = scrollOptions.tabKey ? scrollOptions.tabKey : this.props.currentTabKey;
        let handlerFunction = this._scrollHnadlers[tabKey];
        handlerFunction && handlerFunction(scrollOptions.offset, scrollOptions.animated);
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
  
  _scrollHnadlers = {};
  _addScrollHandler = (tabKey, handlerFunction) => {
    this._scrollHnadlers[tabKey] = handlerFunction;
  };

  render() {
    return (
      <CollapsibleContext.Provider value={this.state.contextProvider}>
        { this.props.children(this.collapseAnimCtrl) }
      </CollapsibleContext.Provider>
    );
  }
}