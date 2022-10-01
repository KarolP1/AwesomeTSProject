import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {ISingleShoppingListEdit} from '../../../navigation/types';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {RecipeStyles} from './Recipesadd';
import SingleIngredientListEdit from '../../../components/recipes/ShoppingList/SingleShoppingListEdit';
import SubmitButton from '../../../components/touchables/SubmitButton';

const SingleShoppingListEdit = (props: ISingleShoppingListEdit) => {
  const list = props.route.params.list;
  const [ingredients, setIngredients] = useState(list.ingredients);
  const [tipIngredients, setTipIngredients] = useState(list.tipIngredients);

  return (
    <LoggedInBackground>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {list.ingredients.length !== 0 && (
          <>
            <Text style={RecipeStyles.TextTitle}>Main ingredients</Text>
            <View style={styles.ingredientContainer}>
              {list.ingredients.map(ingredient => (
                <SingleIngredientListEdit ingredient={ingredient} />
              ))}
            </View>
          </>
        )}
        {list.tipIngredients.length !== 0 && (
          <>
            <Text style={RecipeStyles.TextTitle}>Tip ingredients</Text>
            <View style={styles.ingredientContainer}>
              {list.tipIngredients.map(ingredient => (
                <SingleIngredientListEdit ingredient={ingredient} />
              ))}
            </View>
          </>
        )}
        <SubmitButton title="Finish Shopping for now" onPress={() => {}} />
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
