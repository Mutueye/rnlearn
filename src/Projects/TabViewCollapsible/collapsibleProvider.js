import React from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import CollapseAnimCtrl from './collapseAnimCtrl';
import { CollapsibleContext } from './collapsibleContext';

export default class CollapsibleProvider extends React.Component {
  constructor(props) {
    super(props);

    this.collapseAnimCtrl = new CollapseAnimCtrl();

    this.state = {
      currentTab: null,
      canJumpToTab: true,
      contextProvider: {
        animation: this.collapseAnimCtrl.collapseAnimProps
      }
    };
  }

  componentWillUnmount() {
    this.collapseAnimCtrl.destroy();
  }

  render() {
    return (
      <CollapsibleContext.Provider value={this.state.contextProvider}>
        { this.props.children(this.collapseAnimCtrl) }
      </CollapsibleContext.Provider>
    );
  }
}