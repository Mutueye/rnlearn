import { getStatusBarHeight } from 'react-native-status-bar-height'
import {
  Dimensions
} from 'react-native'

export default Constants = {
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
  statusBarHeight: getStatusBarHeight()
}