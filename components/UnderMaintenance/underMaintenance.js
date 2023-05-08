import { StyleSheet, Text, View,Image} from 'react-native'
import React from 'react'
import Header from '../../components/Header'
const UnderMaintenance = (props) => {
  return (
    <>
      <Header></Header>
      <View style={styles.container}>
      <Image style={styles.imageStyle} source={require("../../assets/settings.png")}></Image>
      <Text style={styles.textStyle}>{props.value} Not Yet Configured !!!!!</Text>
      </View>
    </>
  )
}

export default UnderMaintenance

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"    
    },
    imageStyle:{
        height:350,
        width:350,
        marginBottom:100
    },
    textStyle:{
      fontSize : 20,
      fontWeight:"500",
      color:"#2a7cf6"
    }
})