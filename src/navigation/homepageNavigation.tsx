import {StyleSheet} from 'react-native';
import React from 'react';
import {HomeStackParamList} from './types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackDefaultOptions} from '../options/stackDefaultOptions';
import HugeMenu from '../Pages/signedIn/menu/HugeMenu';
import HomeNavigation from './HomeNavigation';

const HomepageNavigationContainer = () => {
  const Stack = createNativeStackNavigator<HomeStackParamList>();
  return (
    <Stack.Navigator screenOptions={StackDefaultOptions}>
      <Stack.Screen name="HugeMenu2x2" component={HugeMenu} />
      <Stack.Screen name="Home Page" component={HomeNavigation} />
    </Stack.Navigator>
  );
};

export default HomepageNavigationContainer;

const styles = StyleSheet.create({});
