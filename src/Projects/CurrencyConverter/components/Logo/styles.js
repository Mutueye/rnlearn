import EStyleSheet from 'react-native-extended-stylesheet'
import { Dimensions } from 'react-native'

const imageWidth = Dimensions.get('window').width/2

export default EStyleSheet.create({
  $largeContainerSize: imageWidth,
  $largeImageSize: imageWidth/2,
  $smallContainerSize: imageWidth/2,
  $smallImageSize: imageWidth/4,
  container: {
    justifyContent:'center',
    alignItems:'center'
  },
  containerImage: {
    alignItems:'center',
    justifyContent: 'center',
    width:'$largeContainerSize',
    height:'$largeContainerSize'
  },
  logo: {
    width:'$largeImageSize'
  },
  text: {
    color:'white',
    fontWeight:'bold',
    marginTop:14,
    marginBottom:20,
    fontSize:20
  }
})
