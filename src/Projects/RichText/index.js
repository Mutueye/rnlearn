import React, { Component } from 'react';
import { 
  View, 
  StyleSheet, 
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';

import CNStyledText from './CNRichTextEditor/src/CNStyledText'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selection: { start : 0, end: 0}
    };
  }
  
  handleKeyDown = (e) => { 
    console.log('key down ::::', e.nativeEvent.key);
  }
  
  onSelectionChange = (event) => {
    console.log('selection::::', event.nativeEvent.selection);
    const selection = event.nativeEvent.selection;
    if(selection.end >= selection.start) {
      this.setState({
        selection: selection
      });
    } else {
      this.setState({
        selection: {start: selection.end, end: selection.start},
      });
    }
  }
  
  handleChangeText = (text) => {
    console.log('changetext:::::', text)
  }

  render() {
    return (
      <View style={{marginTop: 100, marginBottom: 30, paddingHorizontal: 15, flex: 1}}>
        <TextInput
          underlineColorAndroid='rgba(0,0,0,0)'
          onSelectionChange={this.onSelectionChange} 
          multiline={true}
          style={{
            flex: 1,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: '#d6d6d6',
            color: '#333333',
            textAlignVertical: 'top',
            fontSize: 20,
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 2,
            paddingRight: 2
          }} 
          scrollEnabled={false}
          returnKeyType="done"
          keyboardType="default"
          ref={component => this.textInput = component}
          onChangeText={this.handleChangeText}
          onKeyPress={this.handleKeyDown}
          selection={this.state.selection}>
            <CNStyledText text="测试你好" />
            <CNStyledText style={{fontWeight: 'bold', color: '#0c80e8'}} text="@测试你好" />
            <CNStyledText text=" " />
        </TextInput>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 0,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 1,
    alignItems: 'stretch',
  },
});