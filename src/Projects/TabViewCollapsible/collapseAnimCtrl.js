import { Animated, StatusBar } from 'react-native'; 
import Constants from '../../utils/Constants'
import Variables from './variables'

export default class CollapseAnimCtrl {
  
  maxTopHeight = Constants.tabBarHeight + Variables.collapsibleHeight;
  minTopHeight = Constants.tabBarHeight + Constants.headerHeight + Constants.statusBarHeight;
  collapseRange = this.maxTopHeight - this.minTopHeight;
  
  scrollY = new Animated.Value(0);
  
  initialState = null
  
  constructor(initialState) {
    this.initialState = initialState;
    this.scrollY.addListener(this._updateScroll);
  }
  
  destroy() {
    this.scrollY.removeAllListeners();
  }
  
  _updateScroll = ({value}) => {
    console.log(value)
  };
  
  syncScrollY = () => {
    this.initialState.syncScrollY(this.scrollY._value, this.collapseRange);
  }
  
  stopCurrentScrolling = (currentTabKey) => {
    //stop current tab from momentum scrolling
    console.log('STOP CURRENTTAB====================== ', currentTabKey, 'scrolling');
    this.initialState.scrollToOffset({
      tabKey: currentTabKey,
      offset: this.scrollY._value,
      animated: true
    });
  }
  
  onTabChange = (route, currentTabKey) => {
    //console.log(route)
    /*
    this.initialState.scrollToOffset({
      tabKey: route.key,
      offset: this.scrollY._value,
      animated: true
    });*/
    console.log('onTabChange')
    //stop current tab from momentum scrolling
    /*this.initialState.scrollToOffset({
      tabKey: currentTabKey,
      offset: this.scrollY._value,
      animated: false
    });*/
    this.initialState.saveLastScrollY(currentTabKey);
    this.initialState.loadLastScrollY(route.key);
  }
  
  collapseAnimProps = {
    scrollY: this.scrollY,
    maxTopHeight: this.maxTopHeight,
    collapseRange: this.collapseRange,
    syncScrollY: this.syncScrollY
  };
  
  getCollapseTransform() {
    return {
      transform: [{
        translateY: this.scrollY.interpolate({
          inputRange: [0, this.collapseRange],
          outputRange: [0, -1*this.collapseRange],
          extrapolate: 'clamp'
        })
      }]
    };
  }
  
}