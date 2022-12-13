import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import DropShadow from 'react-native-drop-shadow';
import {useNavigation} from '@react-navigation/native';
import {HomePageScreenProp} from '../../navigation/types';
import {useAppDispatch} from '../../redux/hooks';
import {setLastNavigationDirection} from '../../redux/App/setup.slice';

const MenuSquareCartContainer = (props: {
  name: 'Order' | 'Recipes' | 'Profile' | 'Coming soon';
  image: any;
}) => {
  const navigation = useNavigation<HomePageScreenProp>();

  const dispatch = useAppDispatch();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        dispatch(setLastNavigationDirection(props.name));

        //@ts-ignore
        navigation.navigate('HomePage', {screen: props.name, path: props.name});
      }}>
      <DropShadow style={styles.MenuSquareCartContainer}>
        <Image
          source={props.image}
          style={{width: 60, height: 60, resizeMode: 'cover'}}
        />
        <Text>{props.name}</Text>
      </DropShadow>
    </TouchableOpacity>
  );
};

export default MenuSquareCartContainer;

const styles = StyleSheet.create({
  container: {
    width: '50%',
    aspectRatio: 1,
    marginHorizontal: 10,
    marginVertical: 20,
    backgroundColor: 'rgba(0,0,0,0.11)',
    borderRadius: 10,
  },
  MenuSquareCartContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
    aspectRatio: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 2,
    borderRadius: 10,
  },
});
