import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {getRecipes} from '../../../redux/recipes';
import {getAllRecipes} from '../../../redux/recipes/recipesThunks';
import {AsyncThunk} from '@reduxjs/toolkit';
import {IResponseRegisterResponse} from '../../../redux/Auth/AuthTypes';
import {getTokens} from '../../../redux/Auth/loginReducer';
import {getMyRecipes} from '../../../redux/recipes/myRecipes/myRecipes.thunk';
import {useFocusEffect} from '@react-navigation/native';
import RecipesLists from '../../../components/recipes/recipesLists';
import {instance, refreshTokenInterveptor} from '../../../redux/interceptors';

const Recipesmy = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const run = async () => {
      // TODO: get user id from profile
      await dispatch(getMyRecipes());
    };
    run();
  }, []);

  refreshTokenInterveptor(dispatch, instance);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getMyRecipes());
    }, []),
  );
  const data = useAppSelector(state => state.myRecipes.data);
  return (
    <LoggedInBackground>
      {/* //TODO: implement best recipes */}
      <View style={{flex: 1}}>
        <View style={{maxHeight: 450}}>
          <RecipesLists recipes={data ? data : []} title={'My best recipes'} />
        </View>
        <View style={{maxHeight: 450}}>
          <RecipesLists recipes={data ? data : []} title={'My recipes'} />
        </View>
      </View>
    </LoggedInBackground>
  );
};

export default Recipesmy;
