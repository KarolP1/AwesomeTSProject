import {StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {IRecipe} from '../../redux/recipes/types';
import SingleRecipe from './SingleRecipe';
import {useNavigation} from '@react-navigation/native';
import {RecipesHomePageScreenProp} from '../../navigation/types';

const RecipesLists = ({
  recipes,
  tag,
}: {
  recipes: [] | IRecipe[] | undefined;
  tag?: string;
}) => {
  const navigation = useNavigation<RecipesHomePageScreenProp>();

  return (
    <>
      {tag ? (
        <Text style={styles.TextHeading}>recipes by tag: {tag}</Text>
      ) : (
        <Text style={styles.TextHeading}>All Recipes</Text>
      )}
      <ScrollView
        horizontal={true}
        style={styles.container}
        nestedScrollEnabled={true}>
        {recipes &&
          recipes.map(recipe => (
            <TouchableOpacity
              key={recipe._id}
              style={{
                width: 300,
                marginHorizontal: 10,
                marginVertical: 10,
                borderRadius: 15,
              }}
              onPress={() =>
                navigation.navigate('Single Recipe', {recipe: recipe})
              }>
              <SingleRecipe Recipe={recipe} />
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
