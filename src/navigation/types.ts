import {IIngredientList} from './../Pages/signedIn/recipes/Recipesadd';
import {
  IRecipe,
  IIngredient,
  ShoppingListItemGet,
} from './../redux/recipes/types';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Subscription: undefined;
};
export type AuthScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export type HomeStackParamList = {
  HugeMenu2x2: undefined;
  'Home Page': {
    screen: 'Order' | 'Profile' | 'Recipes' | 'Coming soon';
  };
};
export type HomePageScreenProp = NativeStackNavigationProp<
  HomeStackParamList,
  'HugeMenu2x2'
>;
export type RecipesStackParamList = {
  HugeMenuRecipes2x2: undefined;
  'Recipes Home': {
    screen: 'Find Recipes' | 'My Recipes' | 'Add Recipes' | 'Shopping Lists';
  };
};
export type RecipesPageScreenProp = NativeStackNavigationProp<
  RecipesStackParamList,
  'HugeMenuRecipes2x2'
>;
export type RecipesHomeStackParamList = {
  'Find Recipes': {
    recipesTag?: string | undefined;
  };
  'My Recipes': undefined;
  'Add Recipes': undefined;
  'Shopping Lists': undefined;
  'Single Recipe': {
    recipe: IRecipe;
  };
  'Add Shopping Lists': {
    recipeId: string;
    ingredientsList: IIngredient[];
    tipIngredientsList: IIngredient[];
  };
  'Single ShoppingList Edit': {
    list: ShoppingListItemGet;
  };
};

export type ISingleShoppingListEdit = NativeStackScreenProps<
  RecipesHomeStackParamList,
  'Single ShoppingList Edit'
>;
export type RecipeAddShoppingListScreenProps = NativeStackScreenProps<
  RecipesHomeStackParamList,
  'Add Shopping Lists'
>;
export type SigneRecipeScreenProps = NativeStackScreenProps<
  RecipesHomeStackParamList,
  'Single Recipe'
>;
export type FindScreenProps = NativeStackScreenProps<
  RecipesHomeStackParamList,
  'Find Recipes'
>;
export type RecipesHomePageScreenProp = NativeStackNavigationProp<
  RecipesHomeStackParamList,
  'Find Recipes'
>;
export type HomeTabParamList = {
  Order: undefined;
  Profile: undefined;
  Recipes: undefined;
  'Coming soon': undefined;
};
export type TabPageScreenProp = NativeStackNavigationProp<
  HomeTabParamList,
  'Order'
>;
