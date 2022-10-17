import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import MenuSquareCartContainerReceipes from '../../../components/backgrounds/menuSquareCartContainerRecipes';
import MenuSquareCartContainerOrder from '../../../components/Order/menuContainer';

const OrderMenu = () => {
  return (
    <LoggedInBackground>
      <View
        style={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            color: '#fff',
            fontSize: 30,
            marginHorizontal: 30,
            textAlign: 'left',
            fontWeight: '700',
          }}>
          Choose provider type.
        </Text>
        <View style={styles.main}>
          <View style={styles.rowContainer}>
            <MenuSquareCartContainerOrder
              displayName="Restaurants"
              name="restaurants"
              image={require('../../../assets/utilityIcons/Order/restaurants.png')}
            />
            <MenuSquareCartContainerOrder
              displayName="Foodtrucks"
              name="foodTrucks"
              image={require('../../../assets/utilityIcons/Order/foodtruck.png')}
            />
          </View>
          <View style={styles.rowContainer}>
            <MenuSquareCartContainerOrder
              displayName="Local Cooks"
              name="localCooks"
              image={require('../../../assets/utilityIcons/Order/localcook.png')}
            />
            <MenuSquareCartContainerOrder
              displayName="Shops"
              name="shops"
              image={require('../../../assets/utilityIcons/Order/store.png')}
            />
          </View>
        </View>
      </View>
    </LoggedInBackground>
  );
};

export default OrderMenu;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  rowContainer: {flexDirection: 'row', flex: 1},
});
