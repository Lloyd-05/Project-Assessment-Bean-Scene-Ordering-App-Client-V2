import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import ManagerHomeScreen from '../screens/manager/ManagerHomeScreen';
import userAccountListScreen from '../screens/manager/userAccountCRUD/UserAccountListScreen';
import menuItemsListScreen from '../screens/manager/menuItemsCRUD/MenuItemsListScreen';
import viewOrdersListScreen from '../screens/manager/ViewOrdersListScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabManagerNavigator() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={ManagerHomeScreen} />
            <Tab.Screen name="MenuItems" component={menuItemsListScreen} options={{ title: 'Menu Items' }} />
            <Tab.Screen name="Users" component={userAccountListScreen} options={{ title: 'Users' }} />
            <Tab.Screen name="Orders" component={viewOrdersListScreen} options={{ title: 'Orders' }} />
        </Tab.Navigator>
    );
};