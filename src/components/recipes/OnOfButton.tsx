import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {IRecipeAdd} from '../../Pages/signedIn/recipes/Recipesadd';
import DropShadow from 'react-native-drop-shadow';

const OnOfButton = ({
  isOpen,
  name,
  setIsOpen,
}: {
  isOpen: boolean | undefined;
  name: string;
  setIsOpen: () => void;
}) => {
  return (
    <DropShadow
      style={{
        flex: 1,
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        borderColor: '#fff',
        borderWidth: 1,
        elevation: 2,
        shadowRadius: 10,
        shadowOffset: {
          width: -2,
          height: 4,
        },
        shadowOpacity: 1,
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: isOpen ? 'rgba(77,77,77,.1)' : 'rgba(234,54,81,.2)',
          margin: 1,
          padding: 10,
          borderRadius: 10,
        }}
        onPress={setIsOpen}>
        <Text>OnOfButton</Text>
      </TouchableOpacity>
    </DropShadow>
  );
};

export default OnOfButton;

const styles = StyleSheet.create({});
