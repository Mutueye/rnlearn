import React from 'react';
import { FlatList, Animated } from 'react-native'; 
import { CollapsibleContext } from '../collapsibleContext';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class FlatListHelper extends React.PureComponent {

  scrollToOffset = (offset, isAnimated = true) => {
    this.flatList.getNode().scrollToOffset({offset, isAnimated});
  };

  render() {
    let { scrollY, maxTopHeight } = this.props.animation;
    let { contentContainerStyle } = this.props;
    
    return (
      <AnimatedFlatList
        {...this.props}
        bounces={false}
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