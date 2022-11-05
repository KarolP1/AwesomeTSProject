import {Alert, StyleSheet, Text, View} from 'react-native';
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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {deleteShoppingListThunk} from '../../../redux/recipes/shoppingList/deleteShoppingList.thunk';
import {cleanUpshoppingList} from '../../../redux/recipes/shoppingList/shoppinList.slice';

const SingleShoppingListEdit = (props: ISingleShoppingListEdit) => {
  useFocusEffect(
    React.useCallback(() => {
      dispatch(cleanUpshoppingList());
    }, []),
  );
  const navigation = useNavigation<RecipesHomePageScreenProp>();
  const dispatch = useAppDispatch();
  const list = props.route.params.list;
  const [ingredients, setIngredients] = useState<ShoppingListItem[]>(
    list.ingredients,
  );

  const [tipIngredients, setTipIngredients] = useState<ShoppingListItem[]>(
    list.tipIngredients,
  );

  const {succes, error} = useAppSelector(state => state.shoppingList);

  useEffect(() => {
    if (error) {
      Alert.alert('there was an error', JSON.stringify(error), [
        {text: 'OK', onPress: () => dispatch(cleanUpshoppingList())},
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
        Alert.alert(
          'Message',
          'It is looking like You already finished this shoppingl list',
          [
            {
              text: 'delete',
              onPress: () => {
                dispatch(deleteShoppingListThunk(list._id));
                dispatch(cleanUpshoppingList());
                navigation.navigate('Shopping Lists');
              },
            },
            {
              text: 'lets keep it for now',
              onPress: () => {
                dispatch(cleanUpshoppingList());
                navigation.navigate('Shopping Lists');
              },
            },
            {
              text: 'cancel',
              onPress: () => {
                dispatch(cleanUpshoppingList());
              },
            },
          ],
        );
      } else {
        dispatch(cleanUpshoppingList());
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
