import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackDefaultOptions} from '../../options/stackDefaultOptions';
import Profile from '../../Pages/signedIn/Profile/Profile';
import SingleEmployee from '../../Pages/signedIn/Profile/SingleEmployee';
import {orderHomeParamList} from '../order/types';
import {ProfileParamList} from './ProfileNavigator.types';

export const ProfileNavigationContainer = () => {
  const Stack = createNativeStackNavigator<ProfileParamList>();
  return (
    <Stack.Navigator
      screenOptions={StackDefaultOptions}
      initialRouteName="ProfileHome">
      <Stack.Screen name="ProfileHome" component={Profile} />
      <Stack.Screen name="SingleEmployee" component={SingleEmployee} />
    </Stack.Navigator>
  );
};
