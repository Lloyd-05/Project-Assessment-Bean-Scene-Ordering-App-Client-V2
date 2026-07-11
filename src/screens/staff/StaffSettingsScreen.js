import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ThemeToggle from "../../components/ThemeToggle";
import { ThemeProvider, useTheme, useLogo } from '../../context/ThemeContext';

export default function StaffSettingsScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const beanSceneLogo = useLogo()

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

        <Image source={beanSceneLogo} style={styles.Image} />

        <View style={[styles.banner, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.bannerText, { color: theme.colors.onPrimary }]}>
            Settings
          </Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: theme.colors.gold }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.backText, { color: theme.colors.text }]}>
              Back
            </Text>
          </TouchableOpacity>
          {/* 
          <TouchableOpacity
            style={[styles.applyButton, { backgroundColor: theme.colors.teal }]}
            onPress={() => alert('Changes Applied')}
          >
            <Text style={[styles.applyText, { color: theme.colors.onTeal }]}>
              Apply
            </Text>
          </TouchableOpacity> */}
        </View>
        <ThemeToggle />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    width: '100%'
  },
  scrollView: {
    width: '100%',
    paddingBottom: 40
  },
  scrollView: {
    width: '100%',
    paddingBottom: 40,
    marginBottom: 50,
  },
  Image: {
    marginTop: 50,
    width: "80%",
    height: undefined,
    aspectRatio: 1.8, // tweak until it fits nicely
    resizeMode: "contain",
    alignSelf: "center"
  },
  banner: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 25
  },
  bannerText: {
    color: '#fff',
    fontSize: 32,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#d4af37',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginHorizontal: 10,
  },
  backText: {
    color: '#000',
    fontSize: 32,
  },
  applyButton: {
    backgroundColor: '#0b4d4b',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginHorizontal: 10,
  },
  applyText: {
    color: '#fff',
    fontSize: 32,
  },
});
