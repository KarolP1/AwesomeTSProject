import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackDefaultOptions} from '../options/stackDefaultOptions';
import RecipeAddToShoppingList from '../Pages/signedIn/recipes/recipeAddToShoppingList';
import Recipesadd from '../Pages/signedIn/recipes/Recipesadd';
import RecipesFind from '../Pages/signedIn/recipes/Recipesfind';
import Recipeslists from '../Pages/signedIn/recipes/Recipeslists';
import Recipesmy from '../Pages/signedIn/recipes/Recipesmy';
import SingleRecipe from '../Pages/signedIn/recipes/SingleRecipe';
import SingleShoppingListEdit from '../Pages/signedIn/recipes/SingleShoppingListEdit';
import ISingleShoppingListEdit from '../Pages/signedIn/recipes/SingleShoppingListEdit';
import {RecipesHomeStackParamList} from './types';

const RecipesHomeNavigation = () => {
  const Stack = createNativeStackNavigator<RecipesHomeStackParamList>();
  return (
    <Stack.Navigator screenOptions={StackDefaultOptions}>
      <Stack.Screen name="Find Recipes" component={RecipesFind} />
      <Stack.Screen name="Single Recipe" component={SingleRecipe} />
      <Stack.Screen name="My Recipes" component={Recipesmy} />
      <Stack.Screen name="Add Recipes" component={Recipesadd} />
      <Stack.Screen name="Shopping Lists" component={Recipeslists} />
      <Stack.Screen
        name="Add Shopping Lists"
        component={RecipeAddToShoppingList}
      />
      <Stack.Screen
        name="Single ShoppingList Edit"
        component={SingleShoppingListEdit}
      />
    </Stack.Navigator>
  );
};

export default RecipesHomeNavigation;
