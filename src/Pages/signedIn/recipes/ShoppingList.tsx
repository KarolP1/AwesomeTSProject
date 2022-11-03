import {View} from 'react-native';
import React from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {useFocusEffect} from '@react-navigation/native';
import {getShoppinglists} from '../../../redux/recipes/shoppingList/getShoppinglists.thunk';
import GetSingleShoppingList from '../../../components/recipes/ShoppingList/GetSingleShoppingList';
import {instance} from '../../../redux/interceptors';

const RecipesShoppinglists = () => {
  const dispatch = useAppDispatch();
  const getShoppingListState = useAppSelector(state => state.getShoppinglists);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getShoppinglists());
    }, []),
  );
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

export default RecipesShoppinglists;
