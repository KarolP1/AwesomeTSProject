import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabDefaultOptions} from '../../options/stackDefaultOptions';
import Oreder from '../../Pages/signedIn/Oreder';
import Profile from '../../Pages/signedIn/Profile/Profile';
import BuddyProgram from '../../Pages/signedIn/ComingSoon';
import RecipesNavigation from '../recipes/recipesNavigation';
import {HomeTabParamList} from '../types';
import Tabbar from '../../components/background/Tabbar';

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator<HomeTabParamList>();
  return (
    <Tab.Navigator
      screenOptions={TabDefaultOptions}
      tabBar={props => <Tabbar {...props} />}
      backBehavior={'history'}
      initialRouteName="Order">
      <Tab.Screen
        name="Order"
        component={Oreder}
        options={{
          tabBarIconStyle: {backgroundColor: 'red'},
          tabBarActiveBackgroundColor: 'rgba(80,80,80,1)',
          tabBarIcon: () => (
            <View>
              <Image
                source={require('../../assets/mainIcons/order.png')}
                style={{height: 25, aspectRatio: 1}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Recipes"
        component={RecipesNavigation}
        options={{
          tabBarIconStyle: {backgroundColor: 'red'},
          tabBarActiveBackgroundColor: 'rgba(80,80,80,1)',
          tabBarIcon: () => (
            <View>
              <Image
                source={require('../../assets/mainIcons/recipe.png')}
                style={{height: 25, aspectRatio: 1}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Coming soon"
        component={BuddyProgram}
        options={{
          tabBarIconStyle: {backgroundColor: 'red'},
          tabBarActiveBackgroundColor: 'rgba(80,80,80,1)',
          tabBarIcon: () => (
            <View>
              <Image
                source={require('../../assets/mainIcons/buddy.png')}
                style={{height: 25, aspectRatio: 1}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIconStyle: {backgroundColor: 'red'},
          tabBarActiveBackgroundColor: 'rgba(80,80,80,1)',
          tabBarIcon: () => (
            <View>
              <Image
                source={require('../../assets/mainIcons/profile.png')}
                style={{height: 25, aspectRatio: 1}}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
