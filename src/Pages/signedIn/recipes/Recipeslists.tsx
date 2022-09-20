import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {getRecipes} from '../../../redux/recipes';
import {getAllRecipes} from '../../../redux/recipes/recipesThunks';
import {AsyncThunk} from '@reduxjs/toolkit';
import {IResponseRegisterResponse} from '../../../redux/Auth/AuthTypes';
import {getTokens} from '../../../redux/Auth/loginReducer';

const Recipeslists = () => {
  const dispatch = useAppDispatch();
  const token = getTokens();
  useEffect(() => {
    const run = async () => {
      if (token) {
        await dispatch(getAllRecipes({access_token: token.access_token}));
      }
    };
    run();
  }, []);
  const data = useAppSelector(state => state.recipes.data);
  return (
    <LoggedInBackground>
      <View style={{}}>
        <Text>Recipeslists</Text>
      </View>
    </LoggedInBackground>
  );
};

export default Recipeslists;
