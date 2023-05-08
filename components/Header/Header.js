import React, { useState,useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../components/Context/context';



const Header = ({navigation}) => {
  const { signOut } = useContext(AuthContext)

  const logOut = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to Logout?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancelled'),
          style: 'cancel'
        },
        { text: 'Yes', onPress: () => signOut() }
      ],
      { cancelable: false }
    );
  };

 
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>AI</Text>
        <TouchableOpacity style={styles.powerButton} onPress={logOut}><Ionicons name="power-outline" size={28} color="white" /></TouchableOpacity>
      </View>
    )
  // else {
  //   return <Login/>
  // }
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#2a7cf6',
    height: 100,
    padding: 10,
    justifyContent: "flex-end",
    position: "relative"
  },
  headerText: {
    fontSize: 23,
    color: 'white'
  },
  powerButton: {
    position: "absolute",
    right: 10,
    top: 58
  }
});

export default Header;
