import {RecipesAddHomePageScreenProp} from './../../../navigation/types';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import recipes from '..';
import {IRecipeAdd} from './../../../Pages/signedIn/recipes/Recipesadd';
import {cleanUpAddRecipe} from './addRecipe';
import {String} from 'lodash';

export const isStringValid = (
  string: string | null | undefined,
  title: string,
): boolean => {
  if (string === undefined || string === null || string === '') {
    Alert.alert(
      'Validation',
      `${title} is to short. Try to use longer text instead`,
      [{onPress: () => cleanUpAddRecipe()}],
    );
    return false;
  }

  return true;
};

export const isHoursValid = (
  string: string | null | undefined,
  title: string,
): boolean => {
  if (string) {
    const regex = new RegExp('^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$');
    const stringValid = regex.test(string);
    if (!stringValid) {
      Alert.alert(
        'Validation',
        `${title} not match the pattern HH:MM in 24h system`,
        [{onPress: () => cleanUpAddRecipe()}],
      );
      return false;
    }
  } else return false;
  return true;
};

export const checktIfCategoryIsChoosen = (category: string | null): boolean => {
  if (category === null) return false;
  return false;
};
