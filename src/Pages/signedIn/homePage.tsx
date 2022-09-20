import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {logout} from '../../utils/localStorage';
import {setIsAuth} from '../../redux/rootReducer';
import {useAppDispatch} from '../../redux/hooks';
import {cleanUpLogin} from '../../redux/Auth/loginReducer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomepageNavigation from '../../navigation/homepageNavigation';
import BottomTabNavigator from '../../navigation/bottomTabNavigator';

const HomePage = () => {
  const dispatch = useAppDispatch();
  return <BottomTabNavigator />;
};

export default HomePage;

const styles = StyleSheet.create({});
