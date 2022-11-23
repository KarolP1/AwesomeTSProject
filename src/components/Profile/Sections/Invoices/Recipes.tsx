import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InvoicesList from './InvoicesList';

type Props = {};

const Recipes = (props: Props) => {
  return (
    <View>
      <InvoicesList />
    </View>
  );
};

export default Recipes;

const styles = StyleSheet.create({});
