import React, { Component } from 'react';
import { 
  View, 
  StyleSheet, 
  Keyboard, 
  TouchableWithoutFeedback, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';

import CNRichTextEditor , { CNToolbar, getInitialObject } from "./CNRichTextEditor";

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTag : 'body',
      selectedStyles : [],
      value: [getInitialObject()]
    };

    this.editor = null;  
  }

  onStyleKeyPress = (toolType) => {
    if (toolType !== 'image') {            
      this.editor.applyToolbar(toolType);
    } else {
    // Handling image ...
    }
  }
    
  onSelectedTagChanged = (tag) => {
    this.setState({
      selectedTag: tag
    })
  }

  onSelectedStyleChanged = (styles) => {  
    this.setState({
      selectedStyles: styles
    })
  }

  onValueChanged = (value) => {
    this.setState({
      value: value
    });
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding" 
        enabled
        keyboardVerticalOffset={0}
        style={{
          flex: 1,
          paddingTop: Platform.OS == 'ios' ? 20 : 0,
          backgroundColor:'#eee',
          flexDirection: 'column', 
          justifyContent: 'flex-end'
        }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.main}>
            <CNRichTextEditor                   
              ref={input => this.editor = input}
              onSelectedTagChanged={this.onSelectedTagChanged}
              onSelectedStyleChanged={this.onSelectedStyleChanged}
              value={this.state.value}
              onValueChanged={this.onValueChanged}
              style={{ backgroundColor : '#fff', padding : 10}}
            />
          </View>
        </TouchableWithoutFeedback>
        {/*
          <View style={{minHeight: 35}}>
            <CNToolbar
              selectedTag={this.state.selectedTag}
              selectedStyles={this.state.selectedStyles}
              onStyleKeyPress={this.onStyleKeyPress} 
              size={28}
              bold={<MaterialCommunityIcons name="format-bold" />}
              italic={<MaterialCommunityIcons name="format-italic" />}
              underline={<MaterialCommunityIcons name="format-underline" />}
              lineThrough={<MaterialCommunityIcons name="format-strikethrough-variant" />}
              body={<MaterialCommunityIcons name="format-text" />}
              title={<MaterialCommunityIcons name="format-header-1" />}
              heading={<MaterialCommunityIcons name="format-header-3" />}
              ul={<MaterialCommunityIcons name="format-list-bulleted" />}
              ol={<MaterialCommunityIcons name="format-list-numbers" />}
              image={this.renderImageSelector()}
              foreColor={this.renderColorSelector()}
              highlight={this.renderHighlight()}/>
          </View>*/
        }
        
      </KeyboardAvoidingView>
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