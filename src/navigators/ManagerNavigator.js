import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabManagerNavigator from './BottomTabManagerNavigator';
import ManagerSettingsScreen from '../screens/manager/ManagerSettingsScreen';

import menuItemsListScreen from '../screens/manager/menuItemsCRUD/MenuItemsListScreen';
import createMenuItemScreen from '../screens/manager/menuItemsCRUD/CreateMenuItemScreen';
import updateMenuItemScreen from '../screens/manager/menuItemsCRUD/UpdateMenuItemScreen';
import deleteMenuItemSCreen from '../screens/manager/menuItemsCRUD/DeleteMenuItemScreen';

import menuCategoryListScreen from '../screens/manager/menuCategoryCRUD/MenuCategoriesListScreen';
import createCategoryScreen from '../screens/manager/menuCategoryCRUD/CreateMenuCategoryScreen';
import updateCategoryScreen from '../screens/manager/menuCategoryCRUD/UpdateMenuCategory';
import deleteCategoryScreen from '../screens/manager/menuCategoryCRUD/DeleteMenuCategoryScreen';

import userAccountListScreen from '../screens/manager/userAccountCRUD/UserAccountListScreen';
import createUserAccountScreen from '../screens/manager/userAccountCRUD/CreateUserAccountScreen';
import updateUserAccountScreen from '../screens/manager/userAccountCRUD/UpdateUserAccountScreen';
import deleteUserAccountScreen from '../screens/manager/userAccountCRUD/DeleteUserAccountScreen';

import viewOrderScreen from '../screens/manager/ViewOrderScreen';
import ViewOrdersListScreen from '../screens/manager/ViewOrdersListScreen';

const Stack = createNativeStackNavigator();

export default function ManagerNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ManagerTabs" component={BottomTabManagerNavigator} />
      <Stack.Screen name="Settings" component={ManagerSettingsScreen} />

      <Stack.Screen name="menuItemsList" component={menuItemsListScreen} />
      <Stack.Screen name="createMenuItem" component={createMenuItemScreen} />
      <Stack.Screen name="updateMenuItem" component={updateMenuItemScreen} />
      <Stack.Screen name="deleteMenuItem" component={deleteMenuItemSCreen} />


      <Stack.Screen name="menuCategoryList" component={menuCategoryListScreen} />
      <Stack.Screen name="createCategory" component={createCategoryScreen} />
      <Stack.Screen name="updateCategory" component={updateCategoryScreen} />
      <Stack.Screen name="deleteCategory" component={deleteCategoryScreen} />

      <Stack.Screen name="userAccountList" component={userAccountListScreen} />
      <Stack.Screen name="createUserAccount" component={createUserAccountScreen} />
      <Stack.Screen name="updateUserAccount" component={updateUserAccountScreen} />
      <Stack.Screen name="deleteUserAccount" component={deleteUserAccountScreen} />

      <Stack.Screen name="viewOrdersList" component={ViewOrdersListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="viewOrder" component={viewOrderScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
