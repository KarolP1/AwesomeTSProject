import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useAppDispatch} from '../../redux/hooks';
import BottomTabNavigator from '../../navigation/Home/bottomTabNavigator';

const HomePage = () => {
  const dispatch = useAppDispatch();
  return <BottomTabNavigator />;
};

export default HomePage;

const styles = StyleSheet.create({});
