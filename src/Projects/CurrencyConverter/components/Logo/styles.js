import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems:'center'
  },
  iconContainer : {
    width:122,
    height:136,
    position:'relative'
  },
  backgroundImg: {
    position:'absolute',
    width:122,
    height:136
  },
  logoImg: {
    position:'absolute',
    width:48,
    height:54,
    left:'50%',
    top:'50%',
    marginLeft:-24,
    marginTop:-27
  },
  text: {
    color:'white',
    fontWeight:'bold',
    marginTop:14,
    marginBottom:20,
    fontSize:20
  }
})
