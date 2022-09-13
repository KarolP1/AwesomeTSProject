import React from 'react';
import HomePage from '../Pages/signedIn/homePage';
import LoginPage from '../Pages/signedOut/loginPage';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {StackDefaultOptions} from '../options/stackDefaultOptions';
import RegisterPage from '../Pages/signedOut/registerPage/registerPage';
import {AuthScreenProp, RootStackParamList} from './types';
const AuthNavigation = ({isAuth}: {isAuth: boolean}) => {
  const Stack = createNativeStackNavigator();
  const Stack2 = createNativeStackNavigator<RootStackParamList>();

  if (isAuth) {
    return (
      <Stack.Navigator screenOptions={StackDefaultOptions}>
        <Stack.Screen name="homepage" component={HomePage} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack2.Navigator screenOptions={StackDefaultOptions}>
        <Stack2.Screen name="Login" component={LoginPage} />
        <Stack2.Screen name="Register" component={RegisterPage} />
      </Stack2.Navigator>
    );
  }
};

export default AuthNavigation;
