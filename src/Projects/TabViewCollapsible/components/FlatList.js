import React from 'react';
import { FlatList, Animated } from 'react-native'; 
import { CollapsibleContext } from '../collapsibleContext';

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
    
    /*
    setTimeout(() => { // Fix bug initialScroll set
      this.scrollToOffset(collapseAnimProps.initialScroll, false)
    }, 250);*/
  }

  scrollToOffset = (offset, animated = true) => {
    this.flatList.getNode().scrollToOffset({offset, animated});
  };
  
  saveLastScrollY = () => {
    this.setState({ lastScrollY: this.props.collapseAnimProps.scrollY._value })
  };
  
  loadLastScrollY = () => {
    this.props.collapseAnimProps.scrollY.setValue(this.state.lastScrollY)
  }

  render() {
    let { scrollY, maxTopHeight } = this.props.collapseAnimProps;
    let { contentContainerStyle } = this.props;
    
    return (
      <AnimatedFlatList
        {...this.props}
        bounces={true}
        onContentSizeChange={(contentWidth, contentHeight)=>console.log(this.props.tabKey, ' height:::', contentHeight)}
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