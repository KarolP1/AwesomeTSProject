import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ShoppingCart from '../../components/Order/shoppingCart';
import {StackDefaultOptions} from '../../options/stackDefaultOptions';
import FoodTrucks from '../../Pages/signedIn/Order/FoodTrucks';
import LocalCooks from '../../Pages/signedIn/Order/LocalCooks';
import PaymentPage from '../../Pages/signedIn/Order/PaymentPage';
import Restaurants from '../../Pages/signedIn/Order/Restaurants';
import Shops from '../../Pages/signedIn/Order/Shops';
import {HomeTabParamList} from '../types';
import {orderHomeParamList} from './types';

export const HomepageHomeNavigationContainer = () => {
  const Stack = createNativeStackNavigator<orderHomeParamList>();
  return (
    <Stack.Navigator
      screenOptions={StackDefaultOptions}
      initialRouteName="restaurants">
      <Stack.Screen name="shops" component={Shops} />
      <Stack.Screen name="localCooks" component={LocalCooks} />
      <Stack.Screen name="restaurants" component={Restaurants} />
      <Stack.Screen name="foodTrucks" component={FoodTrucks} />
      <Stack.Screen name="shoppingCart" component={ShoppingCart} />
      <Stack.Screen name="paymentOrderPage" component={PaymentPage} />
    </Stack.Navigator>
  );
};
