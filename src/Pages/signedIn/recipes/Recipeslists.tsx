import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {getRecipes} from '../../../redux/recipes';
import {getAllRecipes} from '../../../redux/recipes/recipesThunks';
import {AsyncThunk} from '@reduxjs/toolkit';
import {IResponseRegisterResponse} from '../../../redux/Auth/AuthTypes';
import {getTokens} from '../../../redux/Auth/loginReducer';
import {useFocusEffect} from '@react-navigation/native';
import {getShoppinglists} from '../../../redux/recipes/shoppingList/getShoppinglists.thunk';
import GetSingleShoppingList from '../../../components/recipes/ShoppingList/GetSingleShoppingList';
import {instance, refreshTokenInterveptor} from '../../../redux/interceptors';

const Recipeslists = () => {
  const dispatch = useAppDispatch();
  const getShoppingListState = useAppSelector(state => state.getShoppinglists);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getShoppinglists());
    }, []),
  );
  refreshTokenInterveptor(dispatch, instance);
  return (
    <LoggedInBackground>
      <View style={{flex: 1, width: '100%'}}>
        {getShoppingListState?.data?.map((list, index) => (
          <GetSingleShoppingList List={list} key={index} />
        ))}
      </View>
    </LoggedInBackground>
  );
};

export default Recipeslists;
