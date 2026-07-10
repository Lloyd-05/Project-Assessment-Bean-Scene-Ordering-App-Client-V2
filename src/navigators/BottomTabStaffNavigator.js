import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tabs } from 'react-native-screens';
import React from 'react';
import StaffHomeScreen from '../screens/staff/StaffHomeScreen';
import waiterCurrentOrdersScreen from '../screens/staff/WaiterCurrentOrdersScreen';
import kitchenCurrentOrdersScreen from '../screens/staff/KitchenCurrentOrdersScreen';

const staffTab = createBottomTabNavigator();

export default function BottomTabStaffNavigator() {
    return (
      <staffTab.Navigator headerMode="none" screenOptions={{ headerShown: false }}>
        <staffTab.Screen name="Home" component={StaffHomeScreen} />
        <staffTab.Screen name="WaiterCurrentOrders" component={waiterCurrentOrdersScreen} />
        <staffTab.Screen name="KitchenCurrentOrders" component={kitchenCurrentOrdersScreen} />
      </staffTab.Navigator>
    );
  };


