import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native'; 

import Colors from '../../../utils/Colors';
import Constants, { rem } from '../../../utils/Constants';

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
        bounces={false}
        scrollEnabled={false}
        data={this.state.dataSource}
        keyExtractor={(item) => item.id.toString()}
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
    margin: 15*rem,
    backgroundColor: '#f0f0f0',
    borderColor: '#eeeeee',
    borderWidth: StyleSheet.hairlineWidth
  }
})