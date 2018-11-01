import React from 'react';
import { FlatList, Animated } from 'react-native'; 
import { CollapsibleContext } from '../collapsibleContext';
import Constants from '../../../utils/Constants';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class FlatListHelper extends React.PureComponent {
  
  constructor(props) {
    super(props)
    
    this.state = {
      lastScrollY: 0
    }
  }
  
  componentDidMount() {
    let { tabKey, collapseAnimProps, addScrollHandler } = this.props;
    
    addScrollHandler(tabKey, 'scrollToOffset', this.scrollToOffset);
    addScrollHandler(tabKey, 'saveLastScrollY', this.saveLastScrollY);
    addScrollHandler(tabKey, 'loadLastScrollY', this.loadLastScrollY);
    addScrollHandler(tabKey, 'getLastScrollY', this.getLastScrollY);
    
    /*
    setTimeout(() => { // Fix bug initialScroll set
      this.scrollToOffset(collapseAnimProps.initialScroll, false)
    }, 250);*/
  }

  scrollToOffset = (offset, animated = true) => {
    this.flatList.getNode().scrollToOffset({offset, animated});
  };
  
  saveLastScrollY = (lastScrollYValue) => {
    this.setState({ 
      lastScrollY: lastScrollYValue ? lastScrollYValue : this.props.collapseAnimProps.scrollY._value 
    }, ()=>{
      console.log(this.props.tabKey, ' saveLastScrollY', this.state.lastScrollY)
    })
  };
  
  loadLastScrollY = (scrollYValue) => {
    /*
    if(this.props.collapseAnimProps.scrollY._value < this.props.collapseAnimProps.collapseRange) {
      this.scrollToOffset(this.props.collapseAnimProps.scrollY._value, false)
    } else {
      if(this.state.lastScrollY < this.props.collapseAnimProps.collapseRange) {
        this.scrollToOffset(this.props.collapseAnimProps.collapseRange, false)
        this.props.collapseAnimProps.scrollY.setValue(this.props.collapseAnimProps.collapseRange)
      } else {
        this.props.collapseAnimProps.scrollY.setValue(this.state.lastScrollY)
      }
    }*/
    //if((this.props.collapseAnimProps.scrollY._value > this.props.collapseAnimProps.collapseRange) && (this.state.lastScrollY >= this.props.collapseAnimProps.collapseRange) ) {
    console.log(this.props.tabKey, 'lastScrollY state is:::::', this.state.lastScrollY)
    this.props.collapseAnimProps.scrollY.setValue(scrollYValue ? scrollYValue : this.state.lastScrollY)
    console.log(this.props.tabKey, ' loadLastScrollY', scrollYValue ? scrollYValue : this.state.lastScrollY)
    //}
  };
  
  getLastScrollY = () => {
    return this.state.lastScrollY
  };
  
  _onMomentumScrollBegin = () =>  this.props.canJumpToTab(false);
  
  _onMomentumScrollEnd = () => {
    //TODO sync scrollY
    this.props.canJumpToTab(true);
    this.props.collapseAnimProps.syncScrollY();
  };
  
  _onScrollEndDrag = e => {
    let velocity = e.nativeEvent.velocity.y;
    if(velocity == 0 || (Constants.isAndroid && Math.abs(Math.round(velocity)) <= 2)) {
      this.props.canJumpToTab(true);
      this.props.collapseAnimProps.syncScrollY();
    }
  };

  render() {
    let { scrollY, maxTopHeight } = this.props.collapseAnimProps;
    let { contentContainerStyle } = this.props;
    
    return (
      <AnimatedFlatList
        {...this.props}
        bounces={true}
        onContentSizeChange={(contentWidth, contentHeight)=>{/*console.log(this.props.tabKey, ' height:::', contentHeight)*/}}
        onMomentumScrollBegin={this._onMomentumScrollBegin}
        onMomentumScrollEnd={this._onMomentumScrollEnd}
        onScrollEndDrag={this._onScrollEndDrag}
        scrollEventThrottle={1}
        contentContainerStyle={[{ paddingTop: maxTopHeight }, contentContainerStyle ]}
        ref={r => this.flatList = r}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } } ],{ useNativeDriver: true })}
      />
    );
  }
}

// HOC
const withCollapsibleContext = Comp => props => (
  <CollapsibleContext.Consumer>
    { (context) => <Comp {...context} {...props} /> }
  </CollapsibleContext.Consumer>
);

export default withCollapsibleContext(FlatListHelper);