import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  StackDefaultOptions,
  TabDefaultOptions,
} from '../options/stackDefaultOptions';
import HugeMenu from '../Pages/signedIn/menu/HugeMenu';
import Oreder from '../Pages/signedIn/Oreder';
import Recipes from '../Pages/signedIn/recipes/Recipesfind';
import Profile from '../Pages/signedIn/Profile';
import BuddyProgram from '../Pages/signedIn/ComingSoon';
import {CommonActions} from '@react-navigation/native';
import RecipesNavigation from './recipesNavigation';

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();
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
