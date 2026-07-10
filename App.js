import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView  } from 'react-native-safe-area-context';
import AppRouter from './src/router/AppRouter';
import NotFoundScreen from './src/screens/NotFoundScreen';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { PaperProvider } from "react-native-paper";


const Stack = createNativeStackNavigator();


function AppContent() {

  //use the theme context defined by the ThemeProvider
  const { theme } = useTheme()

  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <BottomSheetModalProvider>
            <Stack.Navigator>
              <Stack.Screen
                name="AppRouter"
                component={AppRouter}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="NotFound" component={NotFoundScreen} />
            </Stack.Navigator>
          </BottomSheetModalProvider>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  )
}
export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <AppContent />
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
