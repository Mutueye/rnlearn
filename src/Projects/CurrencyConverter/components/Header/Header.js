import React from 'react'
import {
  View,
  TouchableOpacity,
  Image
} from 'react-native'
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements'

import styles from './styles'

const Header = (props) => {

  const { onPress } = props

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon
          type='font-awesome'
          name='cog'
          color='white'
          size={22}
        />
      </TouchableOpacity>
    </View>
  )
}

Header.propTypes = {
  onPress : PropTypes.func
}

export default Header
