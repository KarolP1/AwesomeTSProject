import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
  const changedIngredients = item.dishIngredients.filter(item => {
    if (item.isIngredientVisible) return ids?.indexOf(item._id) !== -1;
  });

  const [totalIngredient, setTotalIngredient] = useState(0);

  const {width} = useWindowDimensions();

  const totalOfAllIngredients = changes
    .map(change => {
      const ingerdient = item.dishIngredients.filter(
        ing => ing._id === change.ingredientId,
      )[0];

      const difference = parseFloat(change.qtt) - ingerdient.qtt;
      const totalPerIngredient =
        ingerdient.pricePerIngredient * (difference > 0 ? difference : 0);
      return totalPerIngredient;
    })
    .reduce((prev, sum) => prev + sum, 0);
  console.log({total: totalOfAllIngredients + item.price});

  useEffect(() => {
    setTotalIngredient(parseFloat(item.price) + totalOfAllIngredients);
  }, [item]);

  console.log({totalIngredientstate: totalIngredient});

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

      {changedIngredients.length > 0 && (
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
      {changedIngredients.map((ingredientEdited, index) => {
        const ingredientFromChanges = changes.filter(
          item => item.ingredientId === ingredientEdited._id,
        )[0];
        const difference =
          parseFloat(ingredientFromChanges.qtt) - ingredientEdited.qtt;
        const totalPerIngredient =
          ingredientEdited.pricePerIngredient *
          (difference > 0 ? difference : 0);

        return (
          <Text
            style={{
              fontFamily: 'Handlee-Regular',
              maxWidth: width - 50,
              fontSize: 14,
              color: '#4d4d4d',
            }}
            key={ingredientEdited._id}>
            {index + 1}:{' '}
            {difference > 0
              ? `${difference} ${ingredientEdited.unit} extra of `
              : `${Math.abs(difference)} ${ingredientEdited.unit}  less of `}
            {ingredientEdited.name} {totalPerIngredient} {item.currency}{' '}
            {difference > 0
              ? `( ${ingredientEdited.pricePerIngredient} ${item.currency} per ingredient )`
              : ''}
          </Text>
        );
      })}
      <Text style={styles.text}>
        Sum: {totalIngredient} {item.currency}
      </Text>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    textAlign: 'right',
    marginVertical: 10,
    fontSize: 20,
    fontFamily: 'Handlee-Regular',
  },
});
