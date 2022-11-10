import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {IEstablishment} from '../../redux/Profile/types';
export type orderHomeParamList = {
  restaurants: undefined;
  shops: undefined;
  foodTrucks: undefined;
  localCooks: undefined;
};

export type orderInitialParamList = {
  OrderPage: {screen: 'restaurants' | 'shops' | 'foodTrucks' | 'localCooks'};
  OrderPageMenu: undefined;
  SingleRestaurantPage: {
    establishment: IEstablishment;
  };
};

export type MenuOrderNavigation = StackNavigationProp<
  orderInitialParamList,
  'OrderPage'
>;

export type ISingleEstablishmentProps = StackScreenProps<
  orderInitialParamList,
  'SingleRestaurantPage'
>;
