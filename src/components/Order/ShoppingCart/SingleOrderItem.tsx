import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ICartItemItem} from '../../../redux/Order/shoppingCart.slice';
import {TextStyles} from '../../../Pages/signedIn/Order/PaymentPage';

const SingleOrderItem = ({
  item,
  index,
}: {
  item: ICartItemItem;
  index: number;
}) => {
  return (
    <View
      key={item.index}
      style={{
        width: '100%',
        overflow: 'hidden',
        marginBottom: 5,
        paddingHorizontal: 20,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Text style={[TextStyles.defaultText, {fontSize: 15}]}>
          {index + 1}. {item.item.dishName}
        </Text>
        <Text
          ellipsizeMode="clip"
          numberOfLines={1}
          style={[
            TextStyles.defaultText,
            {fontSize: 15, flex: 1, marginHorizontal: 10},
          ]}>
          ....................................................................................................................................................................................................................................................................................................................................................................................................................................
        </Text>
        <Text style={[TextStyles.defaultText, {fontSize: 15}]}>
          {item.item.currency} {item.item.price}
        </Text>
      </View>
      {item.changes?.length !== 0 &&
        item.changes?.map((change, index) => {
          const singleIngredient = item.item.dishIngredients.filter(
            ingredient => ingredient._id === change.ingredientId,
          )[0];
          return (
            <View key={index} style={{flexDirection: 'row'}}>
              <Text
                style={[
                  TextStyles.defaultText,
                  {fontSize: 14, paddingLeft: 40, color: '#EA365195'},
                ]}>
                {index + 1}. {change.qtt} {singleIngredient.unit}{' '}
                {singleIngredient.name}
              </Text>
              <Text
                ellipsizeMode="clip"
                numberOfLines={1}
                style={[
                  TextStyles.defaultText,
                  {
                    fontSize: 14,
                    flex: 1,
                    marginHorizontal: 10,
                    color: '#EA365195',
                  },
                ]}>
                ....................................................................................................................................................................................................................................................................................................................................................................................................................................
              </Text>
            </View>
          );
        })}
    </View>
  );
};

export default SingleOrderItem;

const styles = StyleSheet.create({});
