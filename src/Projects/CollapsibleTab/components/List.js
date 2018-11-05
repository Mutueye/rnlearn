import React from 'react';
import { View, StyleSheet, FlatList, Animated, Text } from 'react-native'; 

import Colors from '../../../utils/Colors';
import Constants, { rem } from '../../../utils/Constants';
import Variables from '../variables';

export default class Tab extends React.PureComponent {
   constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      listScrollY: 0,
      contentHeight: 0
    };
  }
  
  componentDidMount() {
    this.setState({
      dataSource: Array(this.props.listLength).fill().map((_, index) => ({id: index}))
    })
    if(this.props.currentTabKey === this.props.route.key) {
      this.onListShow()
    }
    
    this.listener = this.props.scrollY.addListener((scrollY) => {
      if (this.props.currentTabKey === this.props.route.key) {
        const scrollYValue = scrollY.value - this.props.collapsibleDistance >= 0 ? scrollY.value - this.props.collapsibleDistance : 0;
        this.scrollToOffset(scrollYValue, false);
      }
    });
    
  }
  
  componentWillUnmount() {
    this.props.scrollY.removeListener(this.listener);
  }
  
  componentDidUpdate(prevProps) {
    if(this.props.currentTabKey === this.props.route.key) {
      if(this.props.currentTabKey != prevProps.currentTabKey) {
        this.onListShow()        
      }
      /*
      if(this.props.scrollY != prevProps.scrollY) {
        if(this.props.scrollY >= this.props.collapsibleDistance) {
          const targetScrollY = this.props.scrollY - this.props.collapsibleDistance;
          this.scrollToOffset(this.props.scrollY - this.props.collapsibleDistance, false);
          this.setState({listScrollY:targetScrollY});
        }
      }*/
    } else {
      if(this.props.route.key === prevProps.currentTabKey) {
        this.setState({ listScrollY: prevProps.scrollY._value}, ()=> {
          console.log('save ', this.props.route.key, ' listScrollY:::::::::', this.state.listScrollY)
        })
      }
    }
  }
  
  onListShow() {
    console.log('LIST SCROLL Y:::::', this.state.listScrollY)
    //console.log('contentHeight:::::', this.state.contentHeight + Constants.tabBarHeight + Variables.collapsibleHeight)
    //this.props.setContentHeight(this.state.contentHeight + Constants.tabBarHeight + Variables.collapsibleHeight)
    this.setContentHeight(this.state.contentHeight)
    if(this.props.scrollY.value < this.props.collapsibleDistance) {
      this.setState({
        listScrollY: 0
      }, () => this.scrollToOffset(0, false) );
    } else {
      this.props.setViewScroll(this.state.listScrollY + this.props.collapsibleDistance, false)
      //this.scrollToOffset(this.state.listScrollY, false);
    }
  }
  
  /*
  componentWillReceiveProps(nextProps) {
    
    if(this.props.route.key == nextProps.currentTabKey) {
      if(this.props.currentTabkey != nextProps.currentTabKey) {
        this.onListShow()
      }
      
      if(this.props.scrollY != nextProps.scrollY) {
        if(this.props.scrollY >= this.props.collapsibleDistance) {
          const targetScrollY = this.props.scrollY - this.props.collapsibleDistance;
          this.scrollToOffset(this.props.scrollY - this.props.collapsibleDistance, false);
          this.setState({listScrollY:targetScrollY});
        }
      }
    }
    
  }*/
  
  static defaultProps = {
    listLength : 20,
    tabIndex: 0
  }
  
  setContentHeight = (contentHeight) => {
    let tempHeight = contentHeight + Constants.tabBarHeight + Variables.collapsibleHeight;
    if(contentHeight < Constants.screenHeight + this.props.collapsibleDistance) {
      tempHeight = Constants.screenHeight + this.props.collapsibleDistance
    }
    //console.log('tempHeight::::', tempHeight)
    this.props.setContentHeight(tempHeight)
  }
  
  scrollToOffset = (offset, animated = true) => {
    this.flatList.scrollToOffset({offset, animated});
  };

  render() {
    return (
      <FlatList
        contentContainerStyle={styles.content}
        bounces={false}
        scrollEnabled={false}
        onContentSizeChange={(contentWidth, contentHeight)=>{
          this.setState({
            contentHeight: contentHeight
          }, ()=> {
            if(this.props.currentTabKey === this.props.route.key) {
              this.setContentHeight(contentHeight);
            }
          })
        }}
        data={this.state.dataSource}
        keyExtractor={(item) => item.id.toString()}
        ref={r => this.flatList = r}
        renderItem={({item}) => (
          <View style={styles.item} >
            <Text>{item.id}</Text>
          </View>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  content: {
    minHeight: Constants.screenHeight - Constants.statusBarHeight - Constants.headerHeight - Constants.tabBarHeight
  },
  item: {
    height: 150,
    margin: 15,
    backgroundColor: '#f0f0f0',
    borderColor: '#eeeeee',
    borderWidth: StyleSheet.hairlineWidth
  }
})