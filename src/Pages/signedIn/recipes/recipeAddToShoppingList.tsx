import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  RecipeAddShoppingListScreenProps,
  RecipesHomePageScreenProp,
  RecipesPageScreenProp,
} from '../../../navigation/types';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import SingleIngredient from '../../../components/recipes/ingredients/singleIngredient';
import {RecipeStyles} from './Recipesadd';
import PillButton from '../../../components/recipes/PillButton';
import {IIngredient} from '../../../redux/recipes/types';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {instance, refreshTokenInterveptor} from '../../../redux/interceptors';
import {addShoppingListThunk} from '../../../redux/recipes/shoppingList/addShoppinglist.thunk';
import {cleanUpshoppingList} from '../../../redux/recipes/shoppingList/addShoppingList.slice';
import {useNavigation} from '@react-navigation/native';

const RecipeAddToShoppingList = ({route}: RecipeAddShoppingListScreenProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<RecipesHomePageScreenProp>();

  const {ingredientsList, tipIngredientsList, recipeId} = route.params;

  const [isTipIngredients, setIsTipIngredients] = useState<boolean>(true);
  const [shoppingList, setShoppingList] = useState<IIngredient[]>([]);
  const [tipShoppingList, setTipShoppingList] = useState<IIngredient[]>([]);
  refreshTokenInterveptor(dispatch, instance);
  useEffect(() => {
    console.log({ingredientsList, tipIngredientsList, recipeId});
  }, [ingredientsList, tipIngredientsList]);

  const addShoppingListStatus = useAppSelector(
    state => state.addShoppingList.succes,
  );
  useEffect(() => {
    if (addShoppingListStatus === true) {
      navigation.navigate('Shopping Lists');
      cleanUpshoppingList();
    }
  }, [addShoppingListStatus]);

  return (
    <LoggedInBackground>
      <Text style={RecipeStyles.TextTitle}>Main ingredients</Text>
      <View style={styles.ingContainer}>
        {ingredientsList.map((ingredient, index) => (
          <SingleIngredient
            key={index}
            shoppingList={shoppingList}
            ingredient={ingredient}
            setShoppingList={setShoppingList}
          />
        ))}
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[RecipeStyles.TextTitle, {flex: 1, textAlign: 'center'}]}>
          Tip ingredients
        </Text>
        <PillButton status={isTipIngredients} setStatus={setIsTipIngredients} />
      </View>
      <View style={{width: '100%', flex: 1}}>
        {!isTipIngredients === true && (
          <View style={styles.ingContainer}>
            {tipIngredientsList.map((ingredient, index) => (
              <SingleIngredient
                shoppingList={tipShoppingList}
                key={index}
                ingredient={ingredient}
                setShoppingList={setTipShoppingList}
              />
            ))}
          </View>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          dispatch(
            addShoppingListThunk({
              recipeIngredients: shoppingList,
              recipeId: recipeId,
              recipeTipIngredients: tipShoppingList,
            }),
          );
        }}
        style={{
          backgroundColor: '#EA3651',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
        }}>
        <Text style={{color: '#fff'}}>Submit new Shopping Lists</Text>
      </TouchableOpacity>
    </LoggedInBackground>
  );
};

export default RecipeAddToShoppingList;

const styles = StyleSheet.create({
  ingContainer: {marginVertical: 10, width: '100%'},
});
