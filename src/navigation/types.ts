import {
  IIngredientList,
  IRecipeAdd,
} from './../Pages/signedIn/recipes/Recipesadd';
import {
  IRecipe,
  IIngredient,
  ShoppingListItemGet,
} from './../redux/recipes/types';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {StackScreenProps, StackNavigationProp} from '@react-navigation/stack';

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
    screen: NativeStackScreenProps<RecipesHomeStackParamList>;
  };
};
export type HomePageScreenProp = NativeStackNavigationProp<
  HomeStackParamList,
  'HugeMenu2x2'
>;

export type RecipesPageScreenProp = NativeStackNavigationProp<
  RecipesStackParamList,
  'HugeMenuRecipes2x2'
>;

export type HomePageScreenPropNavigation = NativeStackNavigationProp<
  RecipesStackParamList,
  'Recipes Home'
>;

//#region
export type RecipesToProfilePageNavigation = NativeStackNavigationProp<
  RecipesStackParamList,
  'Recipes Home'
>;
export type RecipesToProfilePageScreenProp = NativeStackScreenProps<
  RecipesStackParamList,
  'Recipes Home'
>;
//#endregion
//#region
export type RecipesToSingleRecipePageNavigation = NativeStackNavigationProp<
  RecipesStackParamList,
  'Recipes Home'
>;
export type RecipesToSingleRecipePageScreenProp = NativeStackScreenProps<
  RecipesStackParamList,
  'Recipes Home'
>;
//#endregion
export type IRecipeEdit = NativeStackScreenProps<
  RecipesHomeStackParamList,
  'Edit Recipe'
>;

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

export type RecipesAddHomePageScreenProp = NativeStackNavigationProp<
  RecipesHomeStackParamList,
  'Add Recipes'
>;

/** home navigation */
export type TabPageScreenProp = NativeStackNavigationProp<
  HomeTabParamList,
  'Profile'
>;
export type HomeTabParamList = {
  Order: undefined;
  Profile: undefined;
  Recipes: {
    screen: 'HugeMenuRecipes2x2' | 'Recipes Home';
  };
  'Coming soon': undefined;
};

export type ProfileToRecipesNavigation = CompositeNavigationProp<
  NativeStackNavigationProp<HomeTabParamList, 'Profile'>,
  NativeStackNavigationProp<HomeTabParamList, 'Recipes'>
>;

/** Recipes navigation */
export type RecipesHomeStackParamList = {
  'Find Recipes': {
    recipesTag?: string | undefined;
  };
  'Edit Recipe': {
    recipe: IRecipe;
  };
  'My Recipes': undefined;
  'Add Recipes': {recipe: IRecipeAdd} | undefined;
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
export type RecipesStackParamList = {
  HugeMenuRecipes2x2: undefined;
  'Recipes Home': {
    screen:
      | 'Find Recipes'
      | 'Edit Recipe'
      | 'My Recipes'
      | 'Add Recipes'
      | 'Shopping Lists'
      | 'MyRecipes'
      | 'Add Shopping Lists'
      | 'Single ShoppingList Edit'
      | 'Single Recipe';
    params: {
      recipeGet: IRecipe | null;
    };
  };
};
export type ProfileScreenProps = CompositeNavigationProp<
  NativeStackNavigationProp<RecipesStackParamList, 'Recipes Home'>,
  TabPageScreenProp
>;
export type ProfileRecipeScreenProps = CompositeNavigationProp<
  ProfileScreenProps,
  StackNavigationProp<HomeTabParamList, 'Profile'>
>;

// export type ProfileToRecipeNavigationTypes = NativeStackNavigationProp<
//   HomeTabParamList,
//   'Profile'
// >;
