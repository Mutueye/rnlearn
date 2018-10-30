import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Dimensions } from 'react-native';

const sWidth = Dimensions.get('window').width;
const sHeight = Dimensions.get('window').height;

const originWidth = 375;
const maxWidth = 1000;
const remWidth = sWidth > maxWidth ? maxWidth : sWidth < originWidth ? originWidth : sWidth
export const rem = remWidth / 375;

export default Constants = {
  screenWidth: sWidth, //屏幕宽度
  screenHeight: sHeight, //屏幕高度
  statusBarHeight: getStatusBarHeight(), //状态了高度
  headerHeight: 44*rem,
  commonSpace: 16*rem,
  tabBarHeight: 50*rem,
  fsize_tabbar: 15*rem,
  zIndexHeader: 9999
}