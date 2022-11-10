import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from 'react';
import DropShadow from 'react-native-drop-shadow';
import {IMenuItem} from '../../redux/Profile/types';
import {WEBCONST} from '../../constants/webConstants';

const SingleMenuList = ({menuItem}: {menuItem: IMenuItem}) => {
  const {width} = useWindowDimensions();
  return (
    <DropShadow
      key={menuItem._id}
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,

        elevation: 17,
        width: width / 1.75,
        marginHorizontal: 10,
        backgroundColor: '#ffffff03',

        padding: 20,
        borderRadius: 5,
      }}>
      <DropShadow
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 10,
            height: 10,
          },
          shadowOpacity: 0.39,
          shadowRadius: 8.3,

          elevation: 13,
        }}>
        <Image
          style={{
            height: 100,
            width: '80%',
            aspectRatio: 1,
            resizeMode: 'contain',
            borderRadius: width,
            alignSelf: 'center',
          }}
          source={{
            uri: `${WEBCONST().APIURL}${menuItem.image?.path}`,
          }}
        />
      </DropShadow>
      <Text style={[styles.textStyle, {fontSize: 18}]}>
        {menuItem.dishName}
      </Text>
      <Text
        style={[
          styles.textStyle,
          {
            fontSize: 14,
            fontFamily: 'Handlee-Regular',
            maxHeight: 40,
          },
        ]}>
        {menuItem.dishDescription}
      </Text>
      <Text
        style={[
          styles.textStyle,
          {
            fontSize: 18,
            fontWeight: '900',
          },
        ]}>
        {menuItem.currency}
        {menuItem.price}
      </Text>

      {menuItem.dishIngredients.map(ingredient => (
        <View key={ingredient._id}>
          <Text>{ingredient.name}</Text>
        </View>
      ))}
    </DropShadow>
  );
};

export default SingleMenuList;

const styles = StyleSheet.create({
  textStyle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Damion',
    textTransform: 'capitalize',
  },
});
