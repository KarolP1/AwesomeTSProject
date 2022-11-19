import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import LoggedInBackground from '../background/loggedInBackground';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {ScrollView} from 'react-native-gesture-handler';
import ShoppingListSingleItem from './ShoppingCart/ShoppingListSingleItem';
import {
  clearShoppingList,
  IShoppingCart,
} from '../../redux/Order/shoppingCart.slice';
import {WEBCONST} from '../../constants/webConstants';
import DropShadow from 'react-native-drop-shadow';
import {ShadowStyle} from '../backgrounds/menuSquareCartContainerRecipes';
import {uniqueId} from 'lodash';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {MenuItemButton} from './MenuItemButton';

const ShoppingCart = () => {
  //#region
  const {cartItems} = useAppSelector(state => state.ShoppingCart);

  type reduceResponse = {[key: string]: IShoppingCart[]}[];

  const groupedCartItems: reduceResponse = cartItems?.reduce(
    (result: any, current) => ({
      ...result,
      [current.orderWhere]: [...(result[current.orderWhere] || []), current],
    }),
    {},
  );

  const test =
    groupedCartItems && groupedCartItems.length !== 0
      ? Object.keys(groupedCartItems)
      : [];

  function deleteShopingLists(selectedItems: string[]) {
    const toDelete = cartItems
      ?.map(item => {
        const allOrderedItems = item.orderItems;
        return allOrderedItems.filter(orderItem =>
          selectedItems.includes(orderItem.index),
        );
      })
      .flat();
    console.log(toDelete);
  }

  //#endregion

  //#region
  const animationRotation = useSharedValue(0);
  const {width} = useWindowDimensions();
  const animationSide = useSharedValue(-width);
  const [isExtraButtonRotated, setIsExtraButtonRotated] = useState(false);

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(`${animationRotation.value}deg`, {
            duration: 400,
          }),
        },
      ],
    };
  });
  const animationSideStyle = useAnimatedStyle(() => {
    return {
      right: withTiming(animationSide.value, {duration: 200}),
    };
  });

  const extraMenuRef = useRef(null);

  const {height} = useWindowDimensions();

  //#endregion

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  return (
    <LoggedInBackground
      stickyButton={() => (
        <TouchableOpacity
          onPress={() => {
            animationRotation.value = !isExtraButtonRotated ? 1440 : 0;
            animationSide.value = isExtraButtonRotated ? -width : 0;

            setIsExtraButtonRotated(!isExtraButtonRotated);
          }}
          style={{
            height: '100%',
            backgroundColor: '#4d4d4d',
            padding: 2,
            justifyContent: 'center',
          }}>
          <Animated.Image
            style={[{alignSelf: 'center', margin: 2}, animationStyle]}
            source={require('../../assets/utilityIcons/3dots.png')}
          />
        </TouchableOpacity>
      )}>
      {(!groupedCartItems || groupedCartItems.length === 0) && (
        <Text> There is nothinh here. Add item to cart.</Text>
      )}
      <Animated.View
        ref={extraMenuRef}
        style={[
          {
            width: width,
            position: 'absolute',
            zIndex: 100,
            bottom: 0,
            height: '100%',
          },
          animationSideStyle,
        ]}>
        <TouchableOpacity
          onPress={() => {
            animationRotation.value = !isExtraButtonRotated ? 1440 : 0;
            animationSide.value = isExtraButtonRotated ? -width : 0;
            setIsExtraButtonRotated(!isExtraButtonRotated);
          }}
          activeOpacity={1}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end',
            padding: 20,
            paddingLeft: width / 2,
            paddingRight: 0,
            paddingBottom: 60,
          }}>
          <MenuItemButton
            title="Delete selected items"
            onPress={() => {
              if (selectedItems.length === 0) {
                Alert.alert('Nothing was selected');
              } else {
                deleteShopingLists(selectedItems);
              }
              animationRotation.value = !isExtraButtonRotated ? 1440 : 0;
              animationSide.value = isExtraButtonRotated ? -width : 0;
              setIsExtraButtonRotated(!isExtraButtonRotated);
            }}
          />
          <MenuItemButton
            title="Clear shopping cart"
            onPress={() => {
              dispatch(clearShoppingList());
              animationRotation.value = !isExtraButtonRotated ? 1440 : 0;
              animationSide.value = isExtraButtonRotated ? -width : 0;
              setIsExtraButtonRotated(!isExtraButtonRotated);
            }}
          />
        </TouchableOpacity>
      </Animated.View>
      <ScrollView
        horizontal
        scrollEnabled={false}
        contentContainerStyle={{flex: 1, width: '100%'}}>
        <ScrollView
          style={{width: '100%', maxHeight: height - 190}}
          contentContainerStyle={{
            width: '100%',
            alignItems: 'center',
            paddingBottom: 100,
          }}>
          {test.map(string => {
            // @ts-ignore
            return groupedCartItems[string].map((item, id) => {
              return (
                <View
                  key={id}
                  style={{
                    width: '100%',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    alignItems: 'center',
                  }}>
                  {/* Signle establishment */}
                  <DropShadow style={[ShadowStyle.underImage]}>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        marginBottom: 10,
                      }}
                      source={
                        item.establishment.owner?.images?.profileImage
                          ? {
                              uri: `${WEBCONST().APIURL}${
                                item.establishment.owner?.images?.profileImage
                                  ?.path
                              }`,
                            }
                          : require('../../assets/BX.png')
                      }
                    />
                  </DropShadow>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 20,
                      textTransform: 'capitalize',
                      fontFamily: 'Handlee-Regular',
                    }}>
                    {item.establishment.name}
                  </Text>

                  <ShoppingListSingleItem
                    item={item}
                    key={uniqueId(string)}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                  />
                </View>
              );
            });
          })}
        </ScrollView>
      </ScrollView>
    </LoggedInBackground>
  );
};

export default ShoppingCart;

const styles = StyleSheet.create({});
