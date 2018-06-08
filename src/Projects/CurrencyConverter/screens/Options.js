import React, { Component } from 'react'
import {
  ScrollView,
  StatusBar,
  Linking
} from 'react-native'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'

import { ListItem, Separator } from '../components/List'

const ICON_COLOR = '#969eb3'
const ICON_SIZE = 23

class Options extends Component {

  static propTypes = {
    navigation: PropTypes.object
  }

  handleThemePress = () => {
    console.log('press theme')
    this.props.navigation.navigate('Themes')
  }

  handleSitePress = () => {
    console.log('press site')
    Linking.openURL('httpasdf://fixer.io')
      .catch(() => alert('An Error Occured'))
  }

  render() {
    return (
      <ScrollView>
        <StatusBar barStyle="default" translucent={false} />
        <ListItem
          text="Themes"
          onPress={this.handleThemePress}
          customIcon={
            <Icon
              type="ionicon"
              size={ICON_SIZE}
              color={ICON_COLOR}
              name="ios-arrow-forward"
            />
          }
        />
        <Separator />
        <ListItem
          text="Fixer.io"
          onPress={this.handleSitePress}
          customIcon={
            <Icon
              type="ionicon"
              size={ICON_SIZE}
              color={ICON_COLOR}
              name="ios-link"
            />
          }
        />
        <Separator />
      </ScrollView>
    )
  }
}

export default Options
