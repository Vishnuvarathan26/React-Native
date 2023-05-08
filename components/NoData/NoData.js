import { StyleSheet, Text, View,Image} from 'react-native'
import React from 'react'
const NoData = () => {
  return (
    <>
      <View style={styles.container}>
      <Image style={styles.imageStyle} source={require("../../assets/no-data-found.png")}></Image>
      </View>
    </>
  )
}

export default NoData

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