import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {IRecipeAdd} from '../../Pages/signedIn/recipes/Recipesadd';
import {Shadow} from 'react-native-shadow-2';

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
    <Shadow
      offset={[2, 40]}
      safeRender
      stretch
      paintInside
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10,

        elevation: -16,
      }}
      containerStyle={{
        flex: 1,
        marginVertical: 2,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: -3,
        },
        shadowOpacity: isOpen ? 0.44 : 0.1,
        shadowRadius: isOpen ? 4 : 2,

        elevation: -16,
      }}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          backgroundColor: 'rgba(150, 134, 125, 1)',
          margin: 1,
          padding: 10,
          borderRadius: 10,
          width: '100%',
          overflow: 'hidden',
        }}
        onPress={setIsOpen}>
        <Text style={{textAlign: 'center', color: 'white'}}>{name}</Text>
      </TouchableOpacity>
    </Shadow>
  );
};

export default OnOfButton;

const styles = StyleSheet.create({});
