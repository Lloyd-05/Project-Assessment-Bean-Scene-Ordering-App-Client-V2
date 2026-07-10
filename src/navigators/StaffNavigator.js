import React from 'react'
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StaffHomeScreen from '../screens/staff/StaffHomeScreen';
import StaffSettingsScreen from '../screens/staff/StaffSettingsScreen';
import BottomTabStaffNavigator from './BottomTabStaffNavigator';
import pastOrdersListScreen from '../screens/staff/PastOrdersListScreen';
import waiterCreateOrdersScreen from '../screens/staff/WaiterCreateOrdersScreen';
import pastOrderScreen from '../screens/staff/PastOrderScreen';

const Stack = createNativeStackNavigator();

export default function StaffNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="StaffTabs" component={BottomTabStaffNavigator} options={{ headerShown: false }}/>
            <Stack.Screen name="StaffHome" component={StaffHomeScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Settings" component={StaffSettingsScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="pastOrdersList" component={pastOrdersListScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="pastOrder" component={pastOrderScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="waiterCreateOrders" component={waiterCreateOrdersScreen} options={{ headerShown: false }}/>

        </Stack.Navigator>
    );
}