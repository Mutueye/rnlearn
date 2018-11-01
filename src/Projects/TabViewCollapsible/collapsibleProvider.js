import React from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import CollapseAnimCtrl from './collapseAnimCtrl';
import { CollapsibleContext } from './collapsibleContext';

export default class CollapsibleProvider extends React.Component {
  
  constructor(props) {
    super(props);

    this.collapseAnimCtrl = new CollapseAnimCtrl({
      scrollToOffset: (scrollOptions) => {
        //console.log(scrollOptions.tabKey, ' scrollTo ', scrollOptions.offset)
        let tabKey = scrollOptions.tabKey ? scrollOptions.tabKey : this.props.currentTabKey;
        let scrollToOffset = this._scrollHandlers[tabKey]['scrollToOffset'];
        scrollToOffset && scrollToOffset(scrollOptions.offset, scrollOptions.animated);
      },
      saveLastScrollY: (tabKey) => {
        let _tabKey = tabKey && tabKey != '' ? tabKey : this.props.currentTabKey;
        let saveLastScrollY = this._scrollHandlers[tabKey]['saveLastScrollY'];
        saveLastScrollY && saveLastScrollY(); 
      },
      loadLastScrollY: (tabKey) => {
        let _tabKey = tabKey && tabKey != '' ? tabKey : this.props.currentTabKey;
        let loadLastScrollY = this._scrollHandlers[tabKey]['loadLastScrollY'];
        loadLastScrollY && loadLastScrollY(); 
      },
      syncScrollY: (scrollYValue, collapseRange) => {
        console.log('start sync scrollY and currentTabKey is', this.props.currentTabKey)
        //let saveCurrentTabLastScrollY = this._scrollHandlers[this.props.currentTabKey]['saveLastScrollY'];
        _.map(this.props.routes, (item) => {
          //console.log('ITEM::::::', item, scrollYValue, collapseRange)
          if(item.key != this.props.currentTabKey) {
            let scrollToOffset = this._scrollHandlers[item.key]['scrollToOffset'];
            let lastScrollY = this._scrollHandlers[item.key]['getLastScrollY'];
            let saveLastScrollY = this._scrollHandlers[item.key]['saveLastScrollY'];
            let loadLastScrollY = this._scrollHandlers[item.key]['loadLastScrollY'];
            if(scrollYValue < collapseRange) {
              console.log(item.key, ' scroll to scrollYValue')
              scrollToOffset && scrollToOffset(scrollYValue, false);
              saveLastScrollY && saveLastScrollY(); 
            } else {
              console.log(item.key, ' lastScrollY', lastScrollY());
              if(lastScrollY && (lastScrollY() < collapseRange)) {
                console.log(item.key, ' scroll to collapse range');
                //saveCurrentTabLastScrollY && saveCurrentTabLastScrollY(scrollYValue)
                //let currentScrollYValue = scrollYValue
                console.log('scrollToOffset func is', scrollToOffset)
                scrollToOffset && scrollToOffset(collapseRange, false);
                saveLastScrollY && saveLastScrollY(collapseRange);
                console.log('save:::::value:::::::', scrollYValue);
                loadLastScrollY && loadLastScrollY(scrollYValue);
              }
            }
          }
        });
      }
    });

    this.state = {
      currentTabKey: null,
      canJumpToTab: true,
      contextProvider: {
        collapseAnimProps: this.collapseAnimCtrl.collapseAnimProps,
        addScrollHandler: this._addScrollHandler,
        canJumpToTab: this._canJumpToTab
      }
    };
  }

  componentWillUnmount() {
    this.collapseAnimCtrl.destroy();
  }
  
  _canJumpToTab = (canJumpToTab) => this.setState({canJumpToTab});
  
  _scrollHandlers = {};
  _addScrollHandler = (tabKey, name, handlerFunction) => {
    if(!this._scrollHandlers[tabKey]) this._scrollHandlers[tabKey] = {};
    this._scrollHandlers[tabKey][name] = handlerFunction;
  };

  render() {
    return (
      <CollapsibleContext.Provider value={this.state.contextProvider}>
        { this.props.children(this.collapseAnimCtrl, {canJumpToTab: this.state.canJumpToTab}) }
      </CollapsibleContext.Provider>
    );
  }
}