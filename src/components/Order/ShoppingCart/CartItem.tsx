import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from 'react';
import {ICartItemItem} from '../../../redux/Order/shoppingCart.slice';
import DropShadow from 'react-native-drop-shadow';
import {ShadowStyle} from '../../backgrounds/menuSquareCartContainerRecipes';
import {WEBCONST} from '../../../constants/webConstants';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CartItem = (props: {
  item: ICartItemItem;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  id: string;
}) => {
  const {changes, item, itemId} = props.item;
  const ids = changes?.flatMap(item => item.ingredientId);
  const notChangedIngredients = item.dishIngredients.filter(item => {
    if (item.isIngredientVisible) return ids?.indexOf(item._id) !== -1;
  });

  const {width} = useWindowDimensions();
  return (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomColor: '#ffffff22',
        borderBottomWidth: 1,
        borderTopColor: '#ffffff22',
        borderTopWidth: 1,
      }}>
      <View style={{flexDirection: 'row', height: 100, alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            if (props.selectedItems?.includes(props.id)) {
              props.setSelectedItems(
                props.selectedItems.filter(item => item !== props.id),
              );
            } else props.setSelectedItems([...props.selectedItems, props.id]);
          }}>
          <View
            style={{
              borderWidth: 1,
              width: 20,
              height: 20,
              borderRadius: 5,
              borderColor: '#fff',
              marginRight: 10,
              backgroundColor: '#ffffff15',
            }}>
            {props.selectedItems.includes(props.id) && (
              <Text style={{color: '#fff', textAlign: 'center'}}>✓</Text>
            )}
          </View>
        </TouchableOpacity>
        <DropShadow
          style={[
            ShadowStyle.underImage,
            {
              paddingVertical: 10,
            },
          ]}>
          <Image
            style={{
              width: 50,
              height: '50%',
              aspectRatio: 1,
              borderRadius: 50,
              marginRight: 10,
            }}
            source={
              item.image
                ? {
                    uri: `${WEBCONST().APIURL}${item.image?.path}`,
                  }
                : require('../../../assets/BX.png')
            }
          />
        </DropShadow>
        <View
          style={{
            alignSelf: 'flex-start',
            alignItems: 'center',

            justifyContent: 'space-between',
            flexDirection: 'row',
            flex: 1,

            height: '100%',
          }}>
          <Text
            style={{
              fontFamily: 'Handlee-Regular',
              textAlign: 'center',
              fontSize: 18,
              color: '#fff',
              marginBottom: 10,
              width: 'auto',
            }}>
            {item.dishName}
          </Text>
          <Text
            style={{
              fontFamily: 'Handlee-Regular',
              textAlign: 'center',
              fontSize: 18,
              color: '#fff',
              marginBottom: 10,
              width: 'auto',
            }}>
            {item.currency} {item.price}
          </Text>
        </View>
      </View>

      {notChangedIngredients.length > 0 && (
        <Text
          style={{
            marginVertical: 10,
            fontFamily: 'Handlee-Regular',
            maxWidth: width - 50,
            fontSize: 14,
            color: '#fff',
          }}>
          Changes:
        </Text>
      )}
      {notChangedIngredients.map((ingredientEdited, index) => (
        <Text
          style={{
            fontFamily: 'Handlee-Regular',
            maxWidth: width - 50,
            fontSize: 14,
            color: '#4d4d4d',
          }}
          key={ingredientEdited._id}>
          {index + 1}: {ingredientEdited.name}
        </Text>
      ))}
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({});
