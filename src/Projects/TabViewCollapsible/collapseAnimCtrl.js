import { Animated, StatusBar } from 'react-native'; 
import Constants from '../../utils/Constants'
import Variables from './variables'

export default class CollapseAnimCtrl {
  
  maxTopHeight = Constants.tabBarHeight + Variables.collapsibleHeight;
  minTopHeight = Constants.tabBarHeight + Constants.headerHeight;
  
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
  
  onTabPress = (route) => {
    console.log(route)
    /*
    this.initialState.scrollToOffset({
      tabKey: route.key,
      offset: this.scrollY._value,
      animated: true
    });*/
  }
  
  collapseAnimProps = {
    scrollY: this.scrollY,
    maxTopHeight: this.maxTopHeight
  };
  
}