import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackParamList, HomeTabParamList} from '../types';
import {StackDefaultOptions} from '../../options/stackDefaultOptions';
import HugeMenu from '../../Pages/signedIn/menu/HugeMenu';
import HomeRecipesNavigation from '../recipes/HomeRecipesNavigation.Stack';
import Oreder from '../../Pages/signedIn/Oreder';

const HomepageHomeNavigationContainer = () => {
  const Stack = createNativeStackNavigator<HomeTabParamList>();
  return (
    <Stack.Navigator
      screenOptions={StackDefaultOptions}
      initialRouteName="Order">
      <Stack.Screen name="Order" component={Oreder} />
      <Stack.Screen name="Recipes" component={HomeRecipesNavigation} />
      <Stack.Screen name="Profile" component={HomeRecipesNavigation} />
      <Stack.Screen name="Coming soon" component={HomeRecipesNavigation} />
    </Stack.Navigator>
  );
};

export default HomepageHomeNavigationContainer;

const styles = StyleSheet.create({});
