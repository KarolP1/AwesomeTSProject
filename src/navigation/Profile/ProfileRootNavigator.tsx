import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackDefaultOptions} from '../../options/stackDefaultOptions';
import Profile from '../../Pages/signedIn/Profile/Profile';
import SingleEmployee from '../../Pages/signedIn/Profile/SingleEmployee';
import {ProfileParamList} from './ProfileNavigator.types';
import ProfileNavigationAddMenuItems from '../../Pages/signedIn/Profile/AddMenuItem';
import ProfileNavigationEditMenuItemsPage from '../../Pages/signedIn/Profile/EditMenuItem';

export const ProfileNavigationContainer = () => {
  const Stack = createNativeStackNavigator<ProfileParamList>();
  return (
    <Stack.Navigator
      screenOptions={StackDefaultOptions}
      initialRouteName="ProfileHome">
      <Stack.Screen name="ProfileHome" component={Profile} />
      <Stack.Screen name="SingleEmployee" component={SingleEmployee} />
      <Stack.Screen
        name="AddMenuItem"
        component={ProfileNavigationAddMenuItems}
      />
      <Stack.Screen
        name="EditMenuItem"
        component={ProfileNavigationEditMenuItemsPage}
      />
    </Stack.Navigator>
  );
};
