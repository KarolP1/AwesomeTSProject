import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const SubmitButton = ({
  onPress,
  title,
}: {
  onPress: () => void;
  title: string;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.BodyContainer}>
      <Text style={styles.TextButton}>{title}</Text>
    </TouchableOpacity>
  );
};
//TODO: Add is done to shoppingList
export default SubmitButton;

const styles = StyleSheet.create({
  BodyContainer: {
    backgroundColor: '#EA3651',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  TextButton: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
});
