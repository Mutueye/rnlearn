import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import {
  PanGestureHandler,
  NativeViewGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';

import { LoremIpsum } from '../common';
import { USE_NATIVE_DRIVER } from '../config';

const HEADER_HEIGHT = 50;

const SNAP_POINTS_FROM_TOP = [50, 300, 550];

export class BottomSheet extends Component {
  masterdrawer = React.createRef();
  drawer = React.createRef();
  drawerheader = React.createRef();
  scroll = React.createRef();
  constructor(props) {
    super(props);
    const START = SNAP_POINTS_FROM_TOP[0];
    const END = SNAP_POINTS_FROM_TOP[SNAP_POINTS_FROM_TOP.length - 1];

    this.state = {
      lastSnap: END,
    };

    this._lastScrollYValue = 0;
    this._lastScrollY = new Animated.Value(0);
    this._onRegisterLastScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this._lastScrollY } } }],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );
    this._lastScrollY.addListener(({ value }) => {
      this._lastScrollYValue = value;
      console.log('_reverseLastScrollY', -1*value)
    });

    this._dragY = new Animated.Value(0);
    this._dragY.addListener(({value}) => {
      console.log('_dragY', value)
    })
    this._onGestureEvent = Animated.event(
      [{ nativeEvent: { translationY: this._dragY } }],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );

    this._reverseLastScrollY = Animated.multiply(
      new Animated.Value(-1),
      this._lastScrollY
    );
    
    
    this._translateYOffsetValue = 0;
    this._translateYOffset = new Animated.Value(END);
    this._translateYOffset.addListener(({value}) => {
      if(value < SNAP_POINTS_FROM_TOP[0]) {
        this._translateYOffset.setValue(SNAP_POINTS_FROM_TOP[0]);
        Animated.decay(this._translateYOffset).stop();
      } else if(value > SNAP_POINTS_FROM_TOP[2]) {
        this._translateYOffset.setValue(SNAP_POINTS_FROM_TOP[2]);
        Animated.decay(this._translateYOffset).stop();
      }
      /*
      if(value <= SNAP_POINTS_FROM_TOP[0] || value >= SNAP_POINTS_FROM_TOP[2]) {
        
        
      }*/
      this._translateYOffsetValue = value;
    })
    this._translateY = Animated.add(
      this._translateYOffset,
      Animated.add(this._dragY, this._reverseLastScrollY)
    ).interpolate({
      inputRange: [START, END],
      outputRange: [START, END],
      extrapolate: 'clamp',
    });
  }
  _onHeaderHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.BEGAN) {
      this._lastScrollY.setValue(0);
    }
    this._onHandlerStateChange({ nativeEvent });
  };
  
  _onTapHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.BEGAN) {
      Animated.decay(this._translateYOffset).stop()
    }
  };
  
  _onHandlerStateChange = ({ nativeEvent }) => {
    let { velocityY, translationY } = nativeEvent;
    translationY -= this._lastScrollYValue;
    
    if (nativeEvent.state === State.BEGAN) {
      Animated.decay(this._translateYOffset).stop()
      //console.log('begin v:::', velocityY)
    }
    
    if (nativeEvent.oldState === State.ACTIVE) {
      console.log('after v', velocityY)
      //console.log('NATIVE EVENT:::::::', nativeEvent)
      
      /*const dragToss = 0.2;
      const endOffsetY = this.state.lastSnap + translationY + dragToss * velocityY;
      let destSnapPoint = SNAP_POINTS_FROM_TOP[0];
      for (let i = 0; i < SNAP_POINTS_FROM_TOP.length; i++) {
        const snapPoint = SNAP_POINTS_FROM_TOP[i];
        const distFromSnap = Math.abs(snapPoint - endOffsetY);
        if (distFromSnap < Math.abs(destSnapPoint - endOffsetY)) {
          destSnapPoint = snapPoint;
        }
      }*/
      
      const endOffsetY = this.state.lastSnap + translationY;
      //let finalTranslationY = translationY;
      let destSnapPoint = endOffsetY;
      if(destSnapPoint <= SNAP_POINTS_FROM_TOP[0]) {
        destSnapPoint = SNAP_POINTS_FROM_TOP[0];
      } else if(endOffsetY >= SNAP_POINTS_FROM_TOP[2]) {
        destSnapPoint = SNAP_POINTS_FROM_TOP[2];
      }
      //finalTranslationY = translationY - (endOffsetY - destSnapPoint)
      //console.log(finalTranslationY, destSnapPoint, endOffsetY);
      
      //this.setState({ lastSnap: destSnapPoint });
      //this._translateYOffset.extractOffset();
      //this._translateYOffset.setValue(finalTranslationY);
      this._translateYOffset.setValue(destSnapPoint);
      //this._translateYOffset.flattenOffset();
      this._dragY.setValue(0);
      /*
      Animated.spring(this._translateYOffset, {
        velocity: velocityY,
        tension: 68,
        friction: 12,
        toValue: destSnapPoint,
        useNativeDriver: USE_NATIVE_DRIVER,
      }).start();*/
      
      Animated.decay(this._translateYOffset, {
        velocity: 0.001*velocityY,
        deceleration: 0.997,
        useNativeDriver: USE_NATIVE_DRIVER
      }).start(({finished})=>{
        this.setState({ lastSnap: this._translateYOffsetValue })
      });
    }
  };
  render() {
    return (
      <TapGestureHandler
        maxDurationMs={100000}
        ref={this.masterdrawer}
        onHandlerStateChange={this._onTapHandlerStateChange}
        maxDeltaY={this.state.lastSnap - SNAP_POINTS_FROM_TOP[0]}>
        <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                transform: [{ translateY: this._translateY }],
              },
            ]}>
            <PanGestureHandler
              ref={this.drawerheader}
              simultaneousHandlers={[this.scroll, this.masterdrawer]}
              shouldCancelWhenOutside={false}
              onGestureEvent={this._onGestureEvent}
              onHandlerStateChange={this._onHeaderHandlerStateChange}>
              <Animated.View style={styles.header} />
            </PanGestureHandler>
            <PanGestureHandler
              ref={this.drawer}
              simultaneousHandlers={[this.scroll, this.masterdrawer]}
              shouldCancelWhenOutside={false}
              onGestureEvent={this._onGestureEvent}
              onHandlerStateChange={this._onHandlerStateChange}>
              <Animated.View style={styles.container}>
                <NativeViewGestureHandler
                  ref={this.scroll}
                  waitFor={this.masterdrawer}
                  simultaneousHandlers={this.drawer}>
                  <Animated.ScrollView
                    style={[
                      styles.scrollView,
                      { marginBottom: SNAP_POINTS_FROM_TOP[0] },
                    ]}
                    bounces={false}
                    onScrollBeginDrag={this._onRegisterLastScroll}
                    scrollEventThrottle={1}>
                    <LoremIpsum />
                    <LoremIpsum />
                    <LoremIpsum />
                  </Animated.ScrollView>
                </NativeViewGestureHandler>
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
        </View>
      </TapGestureHandler>
    );
  }
}

export default class Example extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BottomSheet />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: 'red',
  },
});
