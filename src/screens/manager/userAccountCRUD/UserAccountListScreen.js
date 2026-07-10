import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../../../store/UserStore';
import { useTheme, useLogo } from '../../../context/ThemeContext';

const ManageStaffAccountsScreen = () => {
  const { theme } = useTheme();
  const beanSceneLogo = useLogo();
  const navigation = useNavigation();
  const { users, loading, error, fetchUsers } = useUserStore();
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

        <Image source={beanSceneLogo} style={styles.Image} />

        <View style={[styles.banner, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.bannerText, { color: theme.colors.onPrimary }]}>Users List</Text>
        </View>

        <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('createUserAccount')}>
          <Text style={styles.createText}>Create New User</Text>
        </TouchableOpacity>

        <View style={styles.usersContainer}>
          {loading && <ActivityIndicator size="large" color={theme.colors.beanLightBlue} />}
          {error && <Text style={[styles.errorText, { color: theme.colors.beanDarkGold }]}>Error: {error}</Text>}
          {users && users.map((user) => (

            <View key={user._id} style={[styles.userCard, { backgroundColor: theme.colors.primary }]}>

              <Text style={styles.userName}>{user.username}</Text>
              <View style={styles.userButtons}>
                <TouchableOpacity
                  style={[styles.updateButton, { backgroundColor: theme.colors.beanDarkBlue }]} onPress={() => {
                    setSelectedUserId(user._id);
                    navigation.navigate('updateUserAccount', { userId: user._id });
                  }}
                >
                  <Text style={styles.updateText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.deleteButton, { backgroundColor: theme.colors.beanGold }]}
                  onPress={() => {
                    setSelectedUserId(user._id);
                    navigation.navigate('deleteUserAccount', { userId: user._id });
                  }}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.userRole}>{user.role}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ManageStaffAccountsScreen;

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
  createButton: {
    backgroundColor: '#0b4d4b',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  createText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  usersContainer: {
    width: '90%',
    alignItems: 'center',
  },
  userCard: {
    backgroundColor: '#4fa3b6',
    borderRadius: 6,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: '#0b4d4b',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  updateText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#d4af37',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  deleteText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  userRole: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});