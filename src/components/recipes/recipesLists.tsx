import {StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IRecipe} from '../../redux/recipes/types';
import SingleRecipe from './smallSingleRecipe';
import {useNavigation} from '@react-navigation/native';
import {
  RecipesHomePageScreenProp,
  RecipesToProfilePageNavigation,
} from '../../navigation/types';
import {RootNavigationWithRecipeAndRecipePagesProp} from '../../navigation/rootNavigation.navigation';

const RecipesLists = ({
  recipes,
  tag,
  title,
  isEditModeEnabled,
}: {
  recipes?: IRecipe[];
  tag?: string;
  title?: string | null;
  isEditModeEnabled?: boolean;
}) => {
  const navigation = useNavigation<RecipesToProfilePageNavigation>();

  return (
    <>
      {tag ? (
        <Text
          style={[
            styles.TextHeading,
            {display: title === null ? 'none' : 'flex'},
          ]}>
          recipes by tag: {tag}
        </Text>
      ) : (
        <Text
          style={[
            styles.TextHeading,
            {display: title === null ? 'none' : 'flex'},
          ]}>
          {title ? title : 'All Recipes'}
        </Text>
      )}
      <ScrollView
        horizontal={true}
        style={styles.container}
        nestedScrollEnabled={true}>
        {recipes &&
          recipes.map(recipe => (
            <TouchableOpacity
              disabled={isEditModeEnabled ? true : false}
              key={recipe._id}
              style={{
                width: 300,
                marginHorizontal: 10,
                marginVertical: 10,
                borderRadius: 15,
              }}
              onPress={() => {
                if (recipe)
                  navigation.navigate('Recipes Home', {
                    screen: 'Single Recipe',
                    params: {
                      recipeGet: recipe,
                    },
                  });
              }}>
              <SingleRecipe
                Recipe={recipe}
                isEditModeEnabled={isEditModeEnabled}
              />
            </TouchableOpacity>
          ))}
      </ScrollView>
    </>
  );
};

export default RecipesLists;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  TextHeading: {
    color: '#fff',
    fontSize: 20,
    textTransform: 'capitalize',
    marginVertical: 10,
  },
});

//TODO:metadane zdjęć
//jpg zdjęcia
// server components
