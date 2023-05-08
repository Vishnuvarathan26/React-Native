// import { StatusBar } from 'expo-status-bar';
import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, Image, View, Button, StatusBar, Platform, ImageBackground, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NonAuthenticatedNavigator, MainNavigator } from './customNavigation';
import { AuthContext } from './components/Context/context';

export default function App() {
  console.log(StatusBar.currentHeight);
  const [token, settoken] = useState(null)
  const authContext = useMemo(() => ({
    signIn: () => {
      settoken("authorize")
    },
    signOut: () => {
      settoken(null)
    }
  }))
  return (
    <>
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <View style={styles.container}>
          {
            token != null ? <MainNavigator /> :
              <NonAuthenticatedNavigator />
          }
        </View>
      </NavigationContainer>
      </AuthContext.Provider>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dfdfe0"
  }
});