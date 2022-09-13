import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScaleFromCenterAndroid} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';

const CartContainer = ({
  children,
  selected,
}: {
  children: React.ReactNode;
  selected: boolean;
}) => {
  return <View style={styles.container}>{children}</View>;
};

export default CartContainer;

const styles = StyleSheet.create({
  container: {
    width: 250,
    marginHorizontal: 20,
  },
});
