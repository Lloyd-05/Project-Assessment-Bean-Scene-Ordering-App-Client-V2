import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { useUserStore } from '../../../store/UserStore';
import { useTheme, useLogo } from '../../../context/ThemeContext';

const UpdateUserScreen = () => {
  const { theme } = useTheme();
  const beanSceneLogo = useLogo();
  const navigation = useNavigation();
  const route = useRoute();
  const { replaceUser, loading, fetchUserById, selectedUser } = useUserStore();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const userId = route.params?.userId;

  const roles = [
    { label: 'Staff', value: 'staff' },
    { label: 'Manager', value: 'manager' },
  ];

  useEffect(() => {
    if (userId) {
      fetchUserById(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (selectedUser) {
      setUsername(selectedUser.username);
      setPassword('');
      setRole(selectedUser.role);
    }
  }, [selectedUser]);

  const handleUpdate = async () => {
    if (!username.trim() || !role.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const updateData = {
      username: username.trim(),
      role,
    };

    if (password.trim()) {
      updateData.password = password.trim();
    }

    const result = await replaceUser(userId, updateData);
    if (result) {
      setErrorMessage('');
      navigation.goBack();
    } else {
      setErrorMessage('Failed to update user. Please try again.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Image source={beanSceneLogo} style={styles.Image} />

        <View style={[styles.banner, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.bannerText, { color: theme.colors.onPrimary }]}>Update User</Text>
        </View>

        {loading && <ActivityIndicator size="large" color="#4fa3b6" style={{ marginTop: 20 }} />}

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()} disabled={loading}>
            <Text style={[styles.cancelText, { color: theme.colors.beanDarkBlue }]}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.updateButton, { backgroundColor: theme.colors.beanDarkBlue }]}
            onPress={handleUpdate}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.white} />
            ) : (
              <Text style={[styles.updateText, { color: theme.colors.white }]}>Update</Text>
            )}
          </TouchableOpacity>
        </View>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>User Name</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              if (errorMessage) setErrorMessage('');
            }}
            placeholder="Enter username"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errorMessage) setErrorMessage('');
            }}
            secureTextEntry={true}
            placeholder="Enter password"
          />
        </View>


        <Text style={[styles.label, { color: theme.colors.text }]}>Role</Text>

        <View style={[styles.inputGroup, { backgroundColor: theme.colors.beanLightGrey, color: theme.colors.onSurface }]}>
          {/* <Text style={[styles.label, { color: theme.colors.text }]}>Role</Text> */}

          <Dropdown
            style={[styles.dropDown, { backgroundColor: theme.colors.beanLightGrey, color: theme.colors.onSurface }]}
            data={roles}
            labelField="label"
            valueField="value"
            placeholder="Select Role"
            value={role}
            onChange={(item) => {
              setRole(item.value);
              if (errorMessage) setErrorMessage('');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    width: '100%'
  },
  scrollView: {
    width: '100%',
    paddingBottom: 40,
    marginBottom: 50,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 40,
  },

  Image: {
    marginTop: 50,
    width: "100%",
    aspectRatio: 16 / 9,
    resizeMode: 'contain'
  },

  banner: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 25
  },
  bannerText: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: '#d4af37',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginHorizontal: 10,
  },
  cancelText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#0b4d4b',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginHorizontal: 10,
  },
  updateText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputGroup: {
    width: '90%',
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 4,
    fontSize: 16,
    textAlign: 'center',
  },
  dropDown: {
        backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 4,
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
});
