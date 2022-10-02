import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ISingleShoppingListEdit,
  RecipesHomePageScreenProp,
} from '../../../navigation/types';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {RecipeStyles} from './Recipesadd';
import SingleIngredientListEdit from '../../../components/recipes/ShoppingList/SingleShoppingListEdit';
import SubmitButton from '../../../components/touchables/SubmitButton';
import {ShoppingListItem} from '../../../redux/recipes/types';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {editShoppingListThunk} from '../../../redux/recipes/shoppingList/updateShoppinglist.thunk';
import {instance, refreshTokenInterveptor} from '../../../redux/interceptors';
import {useNavigation} from '@react-navigation/native';
import {cleanUpListEdit} from '../../../redux/recipes/shoppingList/updateShoppingList.slice';
import {deleteShoppingListThunk} from '../../../redux/recipes/shoppingList/deleteShoppingList.thunk';
import {cleanupDeleteShoppingList} from '../../../redux/recipes/shoppingList/deleteShoppingList.slice';

const SingleShoppingListEdit = (props: ISingleShoppingListEdit) => {
  const navigation = useNavigation<RecipesHomePageScreenProp>();
  const dispatch = useAppDispatch();
  const list = props.route.params.list;
  const [ingredients, setIngredients] = useState<ShoppingListItem[]>(
    list.ingredients,
  );

  const [tipIngredients, setTipIngredients] = useState<ShoppingListItem[]>(
    list.tipIngredients,
  );

  refreshTokenInterveptor(dispatch, instance);
  const {succes, error} = useAppSelector(state => state.edistShoppingList);

  useEffect(() => {
    if (error) {
      Alert.alert('there was an error', JSON.stringify(error), [
        {text: 'OK', onPress: () => dispatch(cleanUpListEdit())},
      ]);
    }
  }, [error]);

  const mapIngredientsIfAllAreDone = (ingredientsList: ShoppingListItem[]) => {
    return ingredientsList.some(ingredient => ingredient.isDone === false);
  };

  useEffect(() => {
    if (succes === true) {
      const ingredientsTest = mapIngredientsIfAllAreDone(ingredients);
      const tipingredientsTest = mapIngredientsIfAllAreDone(tipIngredients);
      if (ingredientsTest === tipingredientsTest) {
        Alert.alert('Your shopping list is finished', '', [
          {
            text: 'delete',
            onPress: () => {
              dispatch(deleteShoppingListThunk(list._id));
              dispatch(cleanUpListEdit());
              dispatch(cleanupDeleteShoppingList());
              navigation.navigate('Shopping Lists');
            },
          },
          {
            text: 'lets keep it for now',
            onPress: () => {
              dispatch(cleanUpListEdit());
              dispatch(cleanupDeleteShoppingList());
              navigation.navigate('Shopping Lists');
            },
          },
        ]);
      } else {
        dispatch(cleanUpListEdit());
        dispatch(cleanupDeleteShoppingList());
        navigation.navigate('Shopping Lists');
      }
    }
  }, [succes]);

  return (
    <LoggedInBackground>
      <View style={{width: '100%'}}>
        {list.ingredients.length !== 0 && (
          <>
            <Text style={RecipeStyles.TextTitle}>Main ingredients</Text>
            <View style={styles.ingredientContainer}>
              {list.ingredients.map((ingredient, index) => (
                <SingleIngredientListEdit
                  key={index}
                  ingredient={ingredient}
                  ingList={ingredients}
                  setIngList={setIngredients}
                />
              ))}
            </View>
          </>
        )}
        {list.tipIngredients.length !== 0 && (
          <>
            <Text style={RecipeStyles.TextTitle}>Tip ingredients</Text>
            <View style={styles.ingredientContainer}>
              {list.tipIngredients.map((ingredient, index) => (
                <SingleIngredientListEdit
                  key={index}
                  ingredient={ingredient}
                  ingList={tipIngredients}
                  setIngList={setTipIngredients}
                />
              ))}
            </View>
          </>
        )}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <SubmitButton
            title="Finish Shopping for now"
            onPress={() => {
              dispatch(
                editShoppingListThunk({
                  shoppingListId: list._id,
                  recipeIngredients: ingredients,
                  recipeTipIngredients: tipIngredients,
                }),
              );
            }}
          />
          <SubmitButton
            style={{backgroundColor: 'rgb(80,80,80)'}}
            title="Buy ingredients"
            onPress={() => {
              Alert.alert('go to order find shops');
            }}
          />
        </View>
      </View>
    </LoggedInBackground>
  );
};

export default SingleShoppingListEdit;

const styles = StyleSheet.create({
  ingredientContainer: {
    width: '100%',
    marginBottom: 30,
  },
});
