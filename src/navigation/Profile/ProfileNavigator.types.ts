import {
  IRecipe,
  ShoppingListItemGet,
  IIngredient,
} from './../../redux/recipes/types';
import {IMenuItem} from './../../redux/Profile/establishmentMenus/types';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {IWorkspaceEmployeeList} from '../../redux/Order/tables/employees/GetEmployeeList.thunk';
import {IInvoice} from '../../redux/Order/Purchases/getMyPurchases.thunk';

export type ProfileParamList = {
  SingleEmployee: {employee: IWorkspaceEmployeeList};
  ProfileHome: undefined;
  AddMenuItem: {menuId: string};
  EditMenuItem: {menuId: string; item: IMenuItem};
  AddRecipeFromProfile: {from?: 'Profile' | 'Recipe'};
  EditRecipeFromProfile: {recipeGet: IRecipe};
  SingleRecipeFromProfile: {recipe: IRecipe; from: 'Profile' | 'Recipe'};
  ShoppingListsFromProfile: {from: 'Profile' | 'Recipe'};
  AddShoppingListFromProfile: {
    recipeId: string;
    ingredientsList: IIngredient[];
    tipIngredientsList: IIngredient[];
    from: 'Profile' | 'Recipe';
  };
  SingleShoppingListFromProfile: {
    list: ShoppingListItemGet;
  };
  SingleInvoiceFromProfile: {
    invoice: IInvoice;
  };
};

export type ProfileNavigation = StackNavigationProp<
  ProfileParamList,
  'SingleEmployee'
>;

export type ProfileNavigationProps = StackScreenProps<
  ProfileParamList,
  'SingleEmployee'
>;
export type ProfileAddRecipeNavigationProps = StackScreenProps<
  ProfileParamList,
  'AddRecipeFromProfile'
>;
export type ProfileSingleInvoiceProps = StackScreenProps<
  ProfileParamList,
  'SingleInvoiceFromProfile'
>;

export type ProfileSingleRecipeNavigationProps = StackScreenProps<
  ProfileParamList,
  'SingleRecipeFromProfile'
>;

export type ProfileEditRecipeNavigationProps = StackScreenProps<
  ProfileParamList,
  'EditRecipeFromProfile'
>;

export type ProfileNavigationAddMenuItems = StackNavigationProp<
  ProfileParamList,
  'SingleEmployee'
>;

export type ProfileNavigationPropsAddMenuItems = StackScreenProps<
  ProfileParamList,
  'AddMenuItem'
>;

export type ProfileNavigationPropsEditMenuItems = StackScreenProps<
  ProfileParamList,
  'EditMenuItem'
>;

export type SingleShoppingListScreenParam = StackScreenProps<
  ProfileParamList,
  'SingleShoppingListFromProfile'
>;
export type ShoppingListAddScreenParam = StackScreenProps<
  ProfileParamList,
  'AddShoppingListFromProfile'
>;
export type ShoppingListsFromProfileScreenParam = StackScreenProps<
  ProfileParamList,
  'ShoppingListsFromProfile'
>;
