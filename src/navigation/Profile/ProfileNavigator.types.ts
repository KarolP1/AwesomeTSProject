import {IRecipe} from './../../redux/recipes/types';
import {IMenuItem} from './../../redux/Profile/establishmentMenus/types';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {IWorkspaceEmployeeList} from '../../redux/Order/tables/employees/GetEmployeeList.thunk';

export type ProfileParamList = {
  SingleEmployee: {employee: IWorkspaceEmployeeList};
  ProfileHome: undefined;
  AddMenuItem: {menuId: string};
  EditMenuItem: {menuId: string; item: IMenuItem};
  AddRecipeFromProfile: {from?: 'Profile' | 'Recipe'};
  EditRecipeFromProfile: {recipeGet: IRecipe};
  SingleRecipeFromProfile: {recipe: IRecipe};
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
