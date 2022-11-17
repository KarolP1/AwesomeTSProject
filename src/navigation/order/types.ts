import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {IEstablishment, IMenuItem} from '../../redux/Profile/types';
export type orderHomeParamList = {
  restaurants: undefined;
  shops: undefined;
  foodTrucks: undefined;
  localCooks: undefined;
  shoppingCart: undefined;
};

export type orderInitialParamList = {
  OrderPage: NavigatorScreenParams<orderHomeParamList>;
  OrderPageMenu: undefined;
  SingleRestaurantPage: {
    establishment: IEstablishment;
  };
  MenuItemAddModal: {
    menuItem: IMenuItem;
    bestSellers?: IMenuItem[];
    establishmentId: string;
  };
};

export type ISingleEstablishmentProps = StackScreenProps<
  orderInitialParamList,
  'SingleRestaurantPage'
>;

export type MenuOrderNavigation = StackNavigationProp<
  orderInitialParamList,
  'OrderPage'
>;

export type IMenuItemAddModalProps = StackScreenProps<
  orderInitialParamList,
  'MenuItemAddModal'
>;
export type IMenuItemAddModalRoute = RouteProp<
  orderInitialParamList,
  'MenuItemAddModal'
>;
export type IMenuItemAddModalNavigation = StackNavigationProp<
  orderInitialParamList,
  'MenuItemAddModal'
>;
