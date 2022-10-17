import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackDefaultOptions} from '../../options/stackDefaultOptions';
import OrderMenu from '../../Pages/signedIn/Order';
import {HomepageHomeNavigationContainer} from './orderNavigation';
import {orderInitialParamList} from './types';

export const HomepageHomeMenuNavigationContainer = () => {
  const Stack = createNativeStackNavigator<orderInitialParamList>();
  return (
    <Stack.Navigator
      screenOptions={StackDefaultOptions}
      initialRouteName="OrderPageMenu">
      <Stack.Screen
        name="OrderPage"
        component={HomepageHomeNavigationContainer}
      />
      <Stack.Screen name="OrderPageMenu" component={OrderMenu} />
    </Stack.Navigator>
  );
};
