import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {IShoppingCart} from '../../../redux/Order/shoppingCart.slice';
import CartItem from './CartItem';

const ShoppingListSingleItem = ({
  item,
  selectedItems,
  setSelectedItems,
}: {
  item: IShoppingCart;
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  selectedItems: string[];
}) => {
  return (
    <View key={item.orderWhere} style={{width: '100%'}}>
      {item.orderItems.map((orderItem, id) => {
        return (
          <CartItem
            key={Math.random()}
            item={orderItem}
            id={orderItem.index}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        );
      })}
    </View>
  );
};

export default ShoppingListSingleItem;

const styles = StyleSheet.create({});
