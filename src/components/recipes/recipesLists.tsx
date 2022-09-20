import {StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {IRecipe} from '../../redux/recipes/types';
import SingleRecipe from './SingleRecipe';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  getTokens,
  setAuthState,
  setAuthStatus,
} from '../../redux/Auth/loginReducer';
import {getAllRecipes} from '../../redux/recipes/recipesThunks';
import {useNavigation} from '@react-navigation/native';
import {RecipesHomePageScreenProp} from '../../navigation/types';
import {useFocusEffect} from '@react-navigation/native';
import {instance} from '../../redux/interceptors';
import {tokenThunk} from '../../redux/Auth/thunks';
import Keychain from 'react-native-keychain';
import {getTokensKeychain, logout} from '../../utils/localStorage';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {setTokensToStorage} from '../../utils/localStorage';

const RecipesLists = ({filteredRecipes}: {filteredRecipes?: IRecipe[]}) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.recipes.data);
  const navigation = useNavigation<RecipesHomePageScreenProp>();

  //
  const refreshAuthLogic = async (failedRequest: {
    response: {config: {headers: {[x: string]: string}}};
  }) => {
    const tokens = await getTokensKeychain();
    console.log(tokens);
    await axios
      .post(
        '/user/token',
        {token: tokens?.refresh_token},
        {headers: {Authorization: 'Bearer ' + tokens?.access_token}},
      )
      .then(async tokenRefreshResponse => {
        console.log({a: tokenRefreshResponse.data});
        await setTokensToStorage(tokenRefreshResponse.data.token);

        failedRequest.response.config.headers['Authorization'] =
          'Bearer ' + tokenRefreshResponse.data.data.access_token;
        return Promise.resolve();
      })
      .catch(e => {
        console.error(e.response.data);
      });
  };
  //
  createAuthRefreshInterceptor(instance, refreshAuthLogic);

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
