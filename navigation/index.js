import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';


import Login from '../Screens/Login';
import {DashboardNavigator} from '../customNavigation';
import Monitor from '../Screens/Monitor';
import Configuration from '../Screens/Configuration';
import Alert from '../Screens/Alert';

//Screen names
const LoginName = "Login";
const DashboardName = "Dashboard";
const MonitorName = "Monitor"
const ConfigurationName = "Configuration"
const AlertName = "Alert"


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Navigation = () => {
  const navigation = useNavigation()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;

              if (rn === DashboardName) {
                iconName = focused ? 'home' : 'home-outline';
              }
              else if (rn === MonitorName) {
                iconName = focused ? 'pulse' : 'pulse-outline';
              }
              else if (rn === ConfigurationName) {
                iconName = focused ? 'settings' : 'settings-outline';
              }
              else if (rn === AlertName) {
                iconName = focused ? 'alert-circle' : 'alert-circle-outline'
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#2a7cf6",
            tabBarInactiveTintColor: "grey",
            tabBarLabelStyle: {
              paddingBottom: 10,
              fontSize: 10
            },
            tabBarStyle: [
              {
                display: "flex",
                height: 70,
                padding: 10
              },
              null
            ]
          })}
        >
          <Tab.Screen name={DashboardName} component={DashboardNavigator} options={{ headerShown: false }}>
            {/* {({navigation}) => <Dashboard navigation={navigation} />} */}
          </Tab.Screen>
          {/* <Tab.Screen name={DashboardName} component={Dashboard} options={{ headerShown: false }} /> */}
          <Tab.Screen name={MonitorName} component={Monitor} options={{ headerShown: false }} />
          <Tab.Screen name={AlertName} component={Alert} options={{ headerShown: false }} />
          <Tab.Screen name={ConfigurationName} component={Configuration} options={{ headerShown: false }} />

          {/* <Tab.Screen name={settingsName} component={SettingsScreen} /> */}
        </Tab.Navigator>

      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {() => <Login setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
          {/* <Stack.Screen name={DashboardName} component={DashboardNavigator} />
          <Stack.Screen name={MonitorName} component={Monitor} />
          <Stack.Screen name={AlertName} component={Alert} />
          <Stack.Screen name={ConfigurationName} component={Configuration} /> */}

        </Stack.Navigator>
      )}
    </>
  );
};


export default Navigation
