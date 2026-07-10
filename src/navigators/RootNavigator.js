import React from 'react'
import { View,Text, TextInput, Button, StyleSheet} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManagerScreen from './screens/ManagerScreen';
import CustomerScreen from './screens/CustomerScreen';
import StaffHomeScreen from '../screens/staff/StaffHomeScreen';
import staffSettingsScreen from '../screens/staff/staffSettingsScreen';

const Stack = createNativeStackNavigator();

function rootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="StaffHome" component={StaffHomeScreen}    />
      <Stack.Screen name="StaffSettiings" component={staffSettingsScreen} />
    </Stack.Navigator>
  )
}

export default rootNavigator
