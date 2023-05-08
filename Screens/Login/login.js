import React, { useContext, useState } from 'react';
import { View, TextInput, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import CustomButton from '../../components/customButton';
import { useNavigation } from '@react-navigation/native'
import firebase from '../../firebase';
import { AuthContext } from '../../components/Context/context';

// Initialize Firebase
const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageLoad, setPageLoad] = useState(true);
  const { signIn } = useContext(AuthContext)

  const handleLogin = async () => {
    setLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(username, password)
        .then(async ({ user }) => {
          setPageLoad(false)
          signIn()
        })
    } catch (error) {
      setLoading(false);
      console.log(error)
      Alert.alert(error.message);
    }

  };

  const forgotPassword = () => {
    alert("OOPS!! Not Integrated...Try to Remember!!!!!")
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Image style={{ width: 80, height: 80 }} source={require("../../assets/loader.gif")} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../../assets/predictai.png')} resizeMode="contain" />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        <CustomButton text="Login" onPress={handleLogin} />
        <CustomButton text="forgot password?" type="TERTIARY" onPress={forgotPassword} />
      </View>
    </View>
  );

};


const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: "relative"

  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,

  },
  logo: {
    width: 200,
  },
  formContainer: {
    alignItems: 'center',
    padding: 10,
  },
  input: {
    height: 50,
    width: 300,
    marginBottom: 40,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#dddd",
  },
  buttonContainer: {
    backgroundColor: '#3B71F3',
    padding: 10,
    width: 150,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
};


export default LoginPage;



// if (username === 'vishnu@gmail.com' && password === "123456") {
//   setTimeout(async() => {
//     setPageLoad(false)
//     setLoading(false);
//     props.setIsLoggedIn(true)
//   }, 3000);
// } else {
//   setLoading(false);
//   alert('Invalid Credentials');
// }