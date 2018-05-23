import React from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  TextInput
} from 'react-native'
import PropTypes from 'prop-types'
import color from 'color'

import styles from './styles'

const InputWithButton = (props) => {
  const { onPress, buttonText, editable=true } = props

  const containerStyle = [styles.container]
  if(editable === false) {
    containerStyle.push(styles.containerDisabled)
  }

  const underlayColor = color(styles.$buttonBackgroundColorBase).darken(styles.$buttonBackgroundColorModifier)

  return (
    <View style={containerStyle}>
      <TouchableHighlight
        underlayColor={underlayColor}
        onPress={onPress}
        style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableHighlight>
      <View style={styles.border} />
      <TextInput
        underlineColorAndroid="transparent"
        style={styles.input}
        {...props}
      />
    </View>
  )
}


InputWithButton.propTypes = {
  onPress: PropTypes.func,
  buttonText: PropTypes.string,
  editable: PropTypes.bool
}

export default InputWithButton
