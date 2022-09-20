import {StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {IRecipe} from '../../redux/recipes/types';
import SingleRecipe from './SingleRecipe';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  cleanUpLogin,
  getTokens,
  setAuthState,
  setAuthStatus,
} from '../../redux/Auth/loginReducer';
import {getAllRecipes} from '../../redux/recipes/recipesThunks';
import {useNavigation} from '@react-navigation/native';
import {RecipesHomePageScreenProp} from '../../navigation/types';
import {useFocusEffect} from '@react-navigation/native';
import {instance, refreshTokenInterveptor} from '../../redux/interceptors';
import {tokenThunk} from '../../redux/Auth/thunks';
import Keychain from 'react-native-keychain';
import {getTokensKeychain, logout} from '../../utils/localStorage';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {setTokensToStorage} from '../../utils/localStorage';
import {AppDispatch} from '../../redux/store';

const RecipesLists = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.recipes.data);
  const navigation = useNavigation<RecipesHomePageScreenProp>();

  refreshTokenInterveptor(dispatch, instance);

  useFocusEffect(
    React.useCallback(() => {
      const run = async () => {
        const token = await getTokensKeychain();

        if (token) {
          await dispatch(getAllRecipes());
        }
      };
      run();
    }, []),
  );

  return (
    <ScrollView horizontal={true} style={styles.container}>
      {data?.map(recipe => (
        <TouchableOpacity
          style={{
            width: 300,
            marginHorizontal: 10,
            marginVertical: 10,
            borderRadius: 15,
          }}
          key={recipe._id}
          onPress={() =>
            navigation.navigate('Single Recipe', {recipe: recipe})
          }>
          <SingleRecipe Recipe={recipe} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default RecipesLists;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//TODO:metadane zdjęć
//jpg zdjęcia
// server components

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzJhMzBhZGFiZWU4MDFkNjBjM2YzNTUiLCJpYXQiOjE2NjM3MTQwNDAsImV4cCI6MTY2MzcxNDA1NX0.gTYpS6xNXbj_q02gqr5AMUeCqt4Y72gvO1eeqInOZX8"
