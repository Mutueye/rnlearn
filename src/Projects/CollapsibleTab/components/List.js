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
      contentHeight: 0,

      needAdjustOffset: false 
    };
  }
  
  componentDidMount() {
    this.setState({
      dataSource: Array(this.props.listLength).fill().map((_, index) => ({id: index}))
    })
    
    if(this.props.currentTabKey === this.props.route.key) this.onListShow();
    
    this.listener = this.props.scrollY.addListener((scrollY) => {
      if (this.props.currentTabKey === this.props.route.key) {
        //切换tab页面时，顶层ScrollView高度不能及时更改，通过
        //此参数判断是否需要顶层ScrollView持续滚动到上次保存的位置this.state.listScrollY,
        //还是恢复正常，跟随ScrollView的offset滚动当前list
        if(this.state.needAdjustOffset) {
          //console.log('adjusting offset')
          const targetOffset = this.state.listScrollY + this.props.collapsibleDistance
          if(scrollY.value > targetOffset - 1 && scrollY.value < targetOffset + 1) {
            this.setState({needAdjustOffset: false});
          } else {
            if(this.props.scrollRef) this.props.scrollRef.scrollTo({y: targetOffset, animated: false});
          }
        } else {
          const scrollYValue = scrollY.value - this.props.collapsibleDistance >= 0 ? scrollY.value - this.props.collapsibleDistance : 0;
          //console.log(this.props.route.key, 'listener scrollY value', scrollYValue)
          this.scrollToOffset(scrollYValue, false);
        }
      }
    });
  }
  
  componentWillUnmount() {
    this.props.scrollY.removeListener(this.listener);
  }
  
  /*
  componentDidUpdate(prevProps) {
    if(this.props.currentTabKey === this.props.route.key) {
      if(this.props.currentTabKey != prevProps.currentTabKey) {
        this.onListShow()        
      }
    } else {
      if(this.props.route.key === prevProps.currentTabKey) {
        let targetScrollY = this.props.scrollY._value - this.props.collapsibleDistance;
        if(targetScrollY < 0) targetScrollY = 0
        console.log('save', this.props.route.key, 'scrollY', targetScrollY);
        this.setState({listScrollY: targetScrollY});
      }
    }
  }*/
  
  componentWillReceiveProps(nextProps) {
    //tab即将跳转到本list
    if(nextProps.currentTabKey === this.props.route.key && this.props.currentTabKey != this.props.route.key) {
      this.onListShow();
    }
    //tab即将离开本list
    if(nextProps.currentTabKey != this.props.route.key && this.props.currentTabKey === this.props.route.key) { 
      let targetScrollY = this.props.scrollY._value - this.props.collapsibleDistance;
      if(targetScrollY < 0) targetScrollY = 0
      //console.log('save', this.props.route.key, 'scrollY', targetScrollY);
      this.setState({listScrollY: targetScrollY});
    }
  }
  /*
  componentDidUpdate(prevProps) {
    if(this.props.currentTabKey === this.props.route.key && this.props.currentTabKey != prevProps.currentTabKey) {
      this.onListShow()
    }
  }*/
  
  onListShow() {
    this.setContentHeight(this.state.contentHeight)
    if(this.props.scrollY._value < this.props.collapsibleDistance - 1) {
      //console.log(this.props.route.key, 'scroll to 0')
      this.setState({
        listScrollY: 0
      }, () => this.scrollToOffset(0, true) );
    } else {
      if(this.props.scrollRef) {
        //console.log('this.props.scrollRef', this.props.scrollRef)
        //this.scrollToOffset(this.state.listScrollY, false);
        this.setState({needAdjustOffset: true}, ()=>{
          this.props.scrollRef.scrollTo({y: this.state.listScrollY + this.props.collapsibleDistance, animated: false});
          //console.log(this.props.route.key, 'load scrollY and scroll to', this.state.listScrollY)
        })
      }
    }
  }
  
  static defaultProps = {
    listLength : 20,
    tabIndex: 0
  }
  
  setContentHeight = (contentHeight) => {
    let tempHeight = contentHeight + Constants.tabBarHeight + Variables.collapsibleHeight;
    if(contentHeight < Constants.screenHeight + this.props.collapsibleDistance + 1) {
      tempHeight = Constants.screenHeight + this.props.collapsibleDistance + 1
    }
    //console.log(this.props.route.key, 'set content height', tempHeight)
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
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
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