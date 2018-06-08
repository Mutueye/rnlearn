import { StyleSheet, Platform, Dimensions, StatusBar, PixelRatio } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Colors from './Colors';
import Vars from './Vars';

const isIOS = Platform.OS === 'ios' ? true : false
const { width, height } = Dimensions.get('window')
const StatusBarHeight = getStatusBarHeight()
const pixel_ratio = PixelRatio.get()

const Style = StyleSheet.create({
  container: {
    padding: Vars.common_space,
    paddingTop:0
  },
  content_row: {
    margin: -0.5*Vars.common_space,
    flexDirection: 'row'
  },
  content_col: {
    margin: -0.5*Vars.common_space,
    flexDirection: 'column'
  }
})

export default Style
