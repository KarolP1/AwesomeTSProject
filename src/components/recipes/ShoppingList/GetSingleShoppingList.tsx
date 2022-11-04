import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ShoppingListItemGet} from '../../../redux/recipes/types';
import {RecipesHomePageScreenProp} from '../../../navigation/types';
import {useNavigation} from '@react-navigation/native';
import {RecipeStyles} from '../../../Pages/signedIn/recipes/Recipesadd';
import {WEBCONST} from '../../../constants/webConstants';

const GetSingleShoppingList = ({List}: {List: ShoppingListItemGet}) => {
  const navigation = useNavigation<RecipesHomePageScreenProp>();
  const dateYear = List.createdAt;
  const createdDate = new Date(dateYear);
  const recipe = List.recipe;
  console.log(
    `${WEBCONST().APIURL}${List.image?.path}?${new Date().getTime()}`,
  );
  return (
    <TouchableOpacity
      style={styles.listContainer}
      activeOpacity={0.75}
      onPress={() =>
        navigation.navigate('Single ShoppingList Edit', {list: List})
      }>
      <View style={styles.pseudoImage}>
        {List.image && (
          <Image
            style={{height: '100%', width: '100%'}}
            source={{
              uri: `${WEBCONST().APIURL}${
                List.image?.path
              }?${new Date().getTime()}`,
            }}
          />
        )}
      </View>
      <View style={styles.contentContainer}>
        <Text style={RecipeStyles.TextSimple2}>{recipe?.title}</Text>
        <Text style={RecipeStyles.TextSimple2}>{recipe?.description}</Text>
      </View>
      <View style={{height: '100%'}}>
        <Text style={[RecipeStyles.TextSimple2, {fontSize: 10}]}>
          {createdDate.toLocaleDateString()}
        </Text>
        <Text style={[RecipeStyles.TextSimple2, {fontSize: 10}]}>
          {createdDate.toLocaleTimeString()}
        </Text>
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
