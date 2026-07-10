import React from 'react'
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { useAuthStore } from "../../store/AuthStore";
import { useNavigation } from '@react-navigation/native';
// import BeanSceneLogo from '../../../assets/images/logo/png/logo-primary-transparent.png';

import { useLogo, useTheme } from "../../context/ThemeContext";

const StaffHomeScreen = () => {
  const { theme, overrideTheme } = useTheme();
  const beanSceneLogo = useLogo()

  // const beanSceneLogoSource =
  //   overrideTheme === "dark"
  //     ? theme.assets.logoDark
  //     : theme.assets.logoLight;

  const navigation = useNavigation();
  const logout = useAuthStore((state) => state.logout);

  const localDate = new Date().toLocaleDateString('en-GB');

  const localTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });

  const AMPM = new Date().getHours() >= 12 ? 'PM' : 'AM';

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

        <Image source={beanSceneLogo} style={styles.Image} />

        <View style={[styles.banner, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.bannerText, { color: theme.colors.onPrimary }]}>
            Ordering App
          </Text>
        </View>

        <View style={[styles.infoBox, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.infoText, { color: theme.colors.onPrimary }]}>
            You are logged in as staff
          </Text>
        </View>
        <View style={[styles.infoBox, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.infoText, { color: theme.colors.onPrimary }]}>
            Today: {localDate}
          </Text>
        </View>

        <View style={[styles.infoBox, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.infoText, { color: theme.colors.onPrimary }]}>
            Time: {localTime} {AMPM}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.settingsButton, { backgroundColor: theme.colors.teal }]}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={[styles.buttonText, { color: theme.colors.beanDarkBlue }]}>
            Settings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: theme.colors.gold }]}
          onPress={logout}
        >
          <Text style={[styles.buttonText, { color: theme.colors.beanDarkBlue }]}>
            Log Out
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default StaffHomeScreen;

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
  brand: {
    fontSize: 32,
    fontFamily: 'serif',
    color: '#0b4d4b',
    marginBottom: 20,
  },
  banner: {
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
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#4fa3b6',
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 10,

  },
  infoText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontSize: 26,

  },
  settingsButton: {
    backgroundColor: '#d4af37',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: '#d4af37',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20,
  },
  buttonText: {
    color: '#000000',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});