import {StyleSheet} from 'react-native';
import React from 'react';
import {HomeStackParamList} from './types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackDefaultOptions} from '../options/stackDefaultOptions';
import HugeMenu from '../Pages/signedIn/menu/HugeMenu';
import Oreder from '../Pages/signedIn/Oreder';

const HomepageNavigation = () => {
  const Stack = createNativeStackNavigator<HomeStackParamList>();
  return (
    <Stack.Navigator screenOptions={StackDefaultOptions}>
      <Stack.Screen name="HugeMenu2x2" component={HugeMenu} />
      <Stack.Screen name="Home Page" component={HomepageNavigation} />
    </Stack.Navigator>
  );
};

export default HomepageNavigation;

const styles = StyleSheet.create({});
