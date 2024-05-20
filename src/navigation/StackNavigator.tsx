import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import MainScreen from '../screens/MainScreen';

import {navigationRef} from './navigation';
import {NavigationParams} from './types';
import GeofencingScreen from '../screens/GeofencingScreen';

const Stack = createNativeStackNavigator<NavigationParams>();

export const StackNavigator = (): JSX.Element => {
  const defaultOptions: NativeStackNavigationOptions = {
    headerShown: false,
    gestureEnabled: false,
    orientation: 'portrait',
  };
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{...defaultOptions, animation: 'fade'}}
        />
        <Stack.Screen
          name="Geofencing"
          component={GeofencingScreen}
          options={{...defaultOptions, animation: 'slide_from_right'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
