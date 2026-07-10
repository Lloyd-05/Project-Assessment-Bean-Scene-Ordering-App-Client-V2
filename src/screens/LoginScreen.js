import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StaffHomeScreen from "./staff/StaffHomeScreen";
import ManagerHomeScreen from "./manager/ManagerHomeScreen";
import { useAuthStore } from "../store/AuthStore";
import BeanSceneLogo from "../../assets/images/logo/png/logo-primary-transparent.png";
import { ScrollView } from 'react-native-gesture-handler';
import OfflineBanner from '../components/OfflineBanner';

const LoginScreen = ({ route, navigation }) => {

  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const { event, offline } = route?.params || {};
  const [errorMessage, setErrorMessage] = useState('');

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const checkApiStatus = useAuthStore(s => s.checkApiStatus);

  useEffect(() => {
    checkApiStatus();
  }, []);


  const handleLogin = async () => {
    const result = await login(username, password);

    if (!result.ok) {
      if (result.reason === "offline") {
        setErrorMessage("Backend unreachable — please try again later");
        return;
      }

      if (result.reason === "invalid") {
        setErrorMessage("Incorrect username or password");
        return;
      }

      setErrorMessage(result.message || "Login failed");
      return;
    }

    // Success
    setErrorMessage("");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Image style={styles.Image} source={BeanSceneLogo} />

        <View style={styles.banner}>
          <Text style={styles.bannerText}>Welcome to Ordering App</Text>
        </View>
        <OfflineBanner />
        {/* {offline && (
          <View style={{ backgroundColor: "#ffcc00", padding: 10, borderRadius: 6, marginBottom: 16 }}>
            <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>You are offline — showing cached data</Text>
          </View>
        )}         */}
        <Text style={styles.label}>User Name</Text>
        <TextInput
          placeholder="Input"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Input"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />


        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    alignItems: 'center',
    width: '100%',
  },
  scrollView: {
    width: '100%',
    paddingBottom: 40,
    marginBottom: 50,
  },
  scrollContent: {
    alignItems: 'center',
  },
  Image: {
    marginTop: 50,
    width: "100%",
    aspectRatio: 16 / 9,
    resizeMode: 'contain'
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  banner: {
    marginTop: 50,
    maxWidth: '100%',
    backgroundColor: '#4fa3b6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginBottom: 25,
    width: '100%'
  },
  bannerText: {
    color: '#fff',
    fontSize: 32,
    textAlign: 'center',
    maxWidth: '100%',
  },
  label: {
    marginTop: 50,
    maxWidth: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    color: '#333',
    width: '100%',

  },
  input: {
    width: '50%',
    backgroundColor: '#eaeaea',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,

  },
  loginButton: {
    maxWidth: '50%',
    backgroundColor: '#0b4d4b',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,

  },
  loginText: {
    color: '#fff',
    fontSize: 32,
    textAlign: 'center',
  },
});