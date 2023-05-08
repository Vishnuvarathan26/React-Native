//CustomNavigation.js

import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native"
import Dashboard from "./Screens/Dashboard";
import Availability from "./Screens/Availability"
import Login from "./Screens/Login";
import Monitor from './Screens/Monitor';
import Configuration from './Screens/Configuration';
import Alert from './Screens/Alert';



//Screen names
const LoginName = "Login";
const DashboardName = "Dashboard";
const MonitorName = "Monitor"
const ConfigurationName = "Configuration"
const AlertName = "Alert"

const Stack = createStackNavigator();
const nonAuth = createStackNavigator();// creates object for Stack Navigator
const Tab = createBottomTabNavigator();


const DashboardNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Home"
                component={Dashboard}
            />
            <Stack.Screen
                name="Availability"
                component={Availability}
            />
        </Stack.Navigator>
    );
}


const MainNavigator = () => {
    const getRouteName = route => {
        console.log(route)
        const routeName = getFocusedRouteNameFromRoute(route)
        console.log(routeName);
    }

    return (
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
    )
}

export { MainNavigator }

const NonAuthenticatedNavigator = () => {
    return (
        <nonAuth.Navigator screenOptions={{ headerShown: false }}>
            <nonAuth.Screen
                name="Login"
                component={Login}
            />
        </nonAuth.Navigator>
    );
}

export { NonAuthenticatedNavigator }