import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  IRecipe,
  IResponseGetShoppingLists,
  ResponseDataAddShoppingList,
  ShoppingListItemGet,
} from '../../../redux/recipes/types';
import {RecipesHomePageScreenProp} from '../../../navigation/types';
import {useNavigation} from '@react-navigation/native';

const GetSingleShoppingList = ({List}: {List: ShoppingListItemGet}) => {
  // TODO: add create and update date
  const navigation = useNavigation<RecipesHomePageScreenProp>();
  return (
    <TouchableOpacity
      style={styles.listContainer}
      activeOpacity={0.75}
      onPress={() =>
        navigation.navigate('Single ShoppingList Edit', {list: List})
      }>
      <View style={styles.pseudoImage}></View>
      <View style={styles.contentContainer}>
        <Text>{List.recipe[0].title}</Text>
        <Text>{List.recipe[0].description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GetSingleShoppingList;

const styles = StyleSheet.create({
  pseudoImage: {
    height: '100%',
    aspectRatio: 1,
    backgroundColor: '#cac',
    borderRadius: 5,
  },
  listContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    height: 80,
    flexDirection: 'row',
    width: '100%',
    marginVertical: 5,
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
