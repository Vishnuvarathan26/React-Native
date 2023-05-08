import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image,StyleSheet } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native'


const icons = [
    {
      name: 'Dashboard',
      component: "Dashboard",
      iconActive: 'home',
      iconInActive: 'home-outline',
    },

    {
      name: 'Monitor',
      component: "Login",
      iconActive: 'pulse',
      iconInActive: "pulse-outline"
    },
    {
      name: 'Alerts',
      component: "Login",
      iconActive: 'alert-circle',
      iconInActive: "alert-circle-outline"
    },
    {
      name: 'Configuration',
      component: "Dashboard",
      iconActive: 'settings',
      iconInActive: "settings-outline"
    },

  ];


const BottomTabNavigator = () => {
    const [activeTab, setActiveTab] = useState('home')

    const Icon = ({ icon,size}) => (
        <TouchableOpacity onPress={() => setActiveTab(icon.iconActive)}>
        <Ionicons  name={icon.iconActive} size={size} color={icon.iconActive==activeTab ? "#2a7cf6" :"grey"} />
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            {icons.map((icon, index) => (
                <Icon key={index} icon={icon} size={30} />
            ))}
        </View>
    );
};

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:"space-around",
        marginTop:60,
        height:50,
        paddingTop:10
    },
    icon:{
      width:"40%",
    }
})
    
export default BottomTabNavigator;
// <Ionicons name={iconName} size={size} color={color} />