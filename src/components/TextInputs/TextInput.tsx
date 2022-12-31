import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {
  addressType,
  ILoginForm,
  IRegisterForm,
  IStripeDetails,
} from '../../redux/Auth/AuthTypes';

export interface ITextInput {
  placeholder: string;
  isSecure?: boolean;
  onChange: any;
  name: string;
  state?: ILoginForm | IRegisterForm | addressType | IStripeDetails;
  value: string | undefined;
  disabled?: boolean;
}

const TextInputCustom = ({
  placeholder,
  isSecure,
  onChange,
  name,
  state,
  value,
  disabled,
}: ITextInput) => {
  return (
    <View
      style={{
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0,0,0,0.15)',
        borderRadius: 5,
      }}>
      <TextInput
        editable={disabled ? false : true}
        placeholder={placeholder}
        onChangeText={text => {
          onChange({...state, [name]: text});
        }}
        value={value}
        secureTextEntry={isSecure ? true : false}></TextInput>
    </View>
  );
};

export default TextInputCustom;

const styles = StyleSheet.create({});
