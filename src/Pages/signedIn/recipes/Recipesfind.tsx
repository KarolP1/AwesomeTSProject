import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import RecipesLists from '../../../components/recipes/recipesLists';
import {FindScreenProps} from '../../../navigation/types';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {getRecipesErrors} from '../../../redux/recipes';
import {instance} from '../../../redux/interceptors';
import {getTokens, setAuthStatus} from '../../../redux/Auth/loginReducer';
import {tokenThunk} from '../../../redux/Auth/thunks';

const RecipesFind = ({route}: FindScreenProps) => {
  const recFromRoute = useAppSelector(state => state.recipesByTag.data);

  return (
    <LoggedInBackground>
      <Text>search</Text>
      <Text>choose</Text>
      <View style={{height: '80%'}}>
        <RecipesLists />
      </View>
    </LoggedInBackground>
  );
};

export default RecipesFind;
