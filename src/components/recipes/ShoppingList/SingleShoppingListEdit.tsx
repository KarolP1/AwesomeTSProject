import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  ShoppingListItem,
  ShoppingListItemGet,
} from '../../../redux/recipes/types';
import OnOfDot from '../ingredients/OnOfDot';
import {RecipeStyles} from '../../../Pages/signedIn/recipes/Recipesadd';

const SingleIngredientListEdit = ({
  ingredient,
}: {
  ingredient: ShoppingListItem;
}) => {
  const [isDone, setIsDone] = useState<boolean>(ingredient.isDone);
  return (
    <View style={styles.ingredientContainer}>
      <OnOfDot isSelected={isDone} setIsSelected={setIsDone} />
      <View style={styles.ingredientContentContainer}>
        <Text style={RecipeStyles.TextSimple2}>{ingredient.name}</Text>
        <Text style={RecipeStyles.TextSimple2}>
          {ingredient.qtt} {ingredient.unit}
        </Text>
      </View>
    </View>
  );
};

export default SingleIngredientListEdit;

const styles = StyleSheet.create({
  ingredientContentContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ingredientContainer: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
