import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IGetProfileInfo} from '../../../../redux/Profile/types';
import {useAppSelector} from '../../../../redux/hooks';

const RecipesSection = ({}: {}) => {
  const recipes = useAppSelector(state => state.myRecipes.data);
  return (
    <View>
      <Text>{JSON.stringify(recipes)}</Text>
    </View>
  );
};

export default RecipesSection;

const styles = StyleSheet.create({});
