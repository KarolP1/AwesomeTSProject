import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LoggedInBackground from '../background/loggedInBackground';
import {useAppSelector} from '../../redux/hooks';

const ShoppingCart = () => {
  const {cartItems} = useAppSelector(state => state.ShoppingCart);
  return (
    <LoggedInBackground>
      <Text>{JSON.stringify(cartItems)}</Text>
    </LoggedInBackground>
  );
};

export default ShoppingCart;

const styles = StyleSheet.create({});
