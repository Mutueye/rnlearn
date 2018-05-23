import React from 'react'
import {
  TouchableOpacity,
  View,
  Text
} from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

const ClearButton = (props) => {

  const { text, onPress } = props

  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

ClearButton.propTypes = {
  text: PropTypes.string,
  onPress : PropTypes.func
}

export default ClearButton
