import React, {useCallback, useEffect} from 'react';
import LoginPage from '../../Pages/signedOut/loginPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackDefaultOptions} from '../../options/stackDefaultOptions';
import RegisterPage from '../../Pages/signedOut/registerPage/registerPage';
import {HomePageProp, HomeStackParamList, RootStackParamList} from '../types';
import HugeMenu from '../../Pages/signedIn/menu/HugeMenu';

import BottomTabNavigator from '../Home/bottomTabNavigator';
import {
  NavigationContainer,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';
import {linking, linkingLoggedOut} from '../../../linking';
import RNBootSplash from 'react-native-bootsplash';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import LinkingPage from '../../Pages/signedIn/LinkingPage';
import {getMyProfile} from '../../redux/Profile/core/profileCore.thunk';

const AuthNavigation = ({isAuth}: {isAuth: boolean}) => {
  const Stack = createNativeStackNavigator<HomeStackParamList>();
  const Stack2 = createNativeStackNavigator<RootStackParamList>();

  const {data, error, succes} = useAppSelector(state => state.login);
  const dispatch = useAppDispatch();
  function _handleOpenUrl(event: any) {
    console.log('handleOpenUrl', event.url);
  }

  useEffect(() => {
    // declare the data fetching function
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 3000);
  }, []);

  if (isAuth) {
    return (
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          screenOptions={{...StackDefaultOptions}}
          initialRouteName="HugeMenu2x2">
          <Stack.Screen name="HugeMenu2x2" component={HugeMenu} />
          <Stack.Screen name="HomePage" component={BottomTabNavigator} />
          <Stack.Screen name="Linking" component={LinkingPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer linking={linkingLoggedOut}>
        <Stack2.Navigator screenOptions={StackDefaultOptions}>
          <Stack2.Screen name="Login" component={LoginPage} />
          <Stack2.Screen name="Register" component={RegisterPage} />
        </Stack2.Navigator>
      </NavigationContainer>
    );
  }
};

export default AuthNavigation;
