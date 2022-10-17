import {StackNavigationProp} from '@react-navigation/stack';
export type orderHomeParamList = {
  restaurants: undefined;
  shops: undefined;
  foodTrucks: undefined;
  localCooks: undefined;
};

export type orderInitialParamList = {
  OrderPage: {screen: 'restaurants' | 'shops' | 'foodTrucks' | 'localCooks'};
  OrderPageMenu: undefined;
};

export type MenuOrderNavigation = StackNavigationProp<
  orderInitialParamList,
  'OrderPage'
>;
