import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabDefaultOptions} from '../options/stackDefaultOptions';
import Oreder from '../Pages/signedIn/Oreder';
import Profile from '../Pages/signedIn/Profile';
import BuddyProgram from '../Pages/signedIn/ComingSoon';
import RecipesNavigation from './recipesNavigation';
import {HomeTabParamList} from './types';

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator<HomeTabParamList>();
  return (
    <Tab.Navigator screenOptions={TabDefaultOptions} backBehavior={'history'}>
      <Tab.Screen name="Order" component={Oreder} />
      <Tab.Screen name="Recipes" component={RecipesNavigation} />
      <Tab.Screen name="Coming soon" component={BuddyProgram} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
