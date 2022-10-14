import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  HomeStackParamList,
  HomeTabParamList,
  RecipesHomeStackParamList,
  RecipesStackParamList,
} from './types';

export type RootNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'Home Page'>,
  BottomTabNavigationProp<HomeTabParamList>
>;

export type RootNavigationWithRecipeProp = CompositeNavigationProp<
  RootNavigationProp,
  NativeStackNavigationProp<RecipesStackParamList>
>;

export type RootNavigationWithRecipeAndRecipePagesProp =
  CompositeNavigationProp<
    RootNavigationWithRecipeProp,
    NativeStackNavigationProp<RecipesHomeStackParamList>
  >;

export type ProfileRecipeNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RecipesHomeStackParamList, 'Edit Recipe'>,
  NativeStackNavigationProp<HomeTabParamList, 'Profile'>
>;
