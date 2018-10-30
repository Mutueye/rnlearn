import React from 'react';
import { View, StyleSheet } from 'react-native';
import FlatList from './FlatList';
import Variables from '../variables';
import Constants from '../../../utils/Constants';

const fullHeaderHeight = Variables.collapsibleHeight + Constants.tabBarHeight

export default class Tab extends React.PureComponent {
   constructor(props) {
    super(props);

    this.state = {
      dataSource: []
    };
  }
  
  componentDidMount() {
    this.setState({
      dataSource: Array(this.props.listLength).fill().map((_, index) => ({id: index}))
    })
  }
  
  static defaultProps = {
    listLength : 20,
    tabIndex: 0
  }

  render() {
    return (
      <FlatList
        style={styles.wrapper}
        data={this.state.dataSource}
        tabRoute={this.props.route.key}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[
          {
            paddingTop: fullHeaderHeight
          }, 
          this.props.contentContainerStyle
        ]}
        renderItem={({item}) => (
          <View style={styles.item} />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15
  },
  item: {
    height: 150,
    backgroundColor: '#eaeaea',
    marginBottom: 20,
    borderColor: '#eeeeee',
    borderWidth: StyleSheet.hairlineWidth
  }
})