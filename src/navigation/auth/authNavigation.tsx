import React, {useEffect} from 'react';
import LoginPage from '../../Pages/signedOut/loginPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackDefaultOptions} from '../../options/stackDefaultOptions';
import RegisterPage from '../../Pages/signedOut/registerPage/registerPage';
import {HomeStackParamList, RootStackParamList} from '../types';
import HugeMenu from '../../Pages/signedIn/menu/HugeMenu';

import BottomTabNavigator from '../Home/bottomTabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {linking, linkingLoggedOut} from '../../../linking';
import {getTokensKeychain, logout} from '../../utils/localStorage';
import RNBootSplash from 'react-native-bootsplash';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {setIsAuth} from '../../redux/rootReducer';
import {setAuthState} from '../../redux/Auth/loginReducer';
import {tokenThunk} from '../../redux/Auth/thunks';

const AuthNavigation = ({isAuth}: {isAuth: boolean}) => {
  const Stack = createNativeStackNavigator<HomeStackParamList>();
  const Stack2 = createNativeStackNavigator<RootStackParamList>();

  const {data} = useAppSelector(state => state.login);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const tokens = await getTokensKeychain();
      if (!tokens) {
        dispatch(setIsAuth(false));
        dispatch(setAuthState(null));
        RNBootSplash.hide({fade: true});
      } else {
        dispatch(tokenThunk());
        if (data) {
          dispatch(setAuthState(data));
          dispatch(setIsAuth(true));
        } else {
          dispatch(setIsAuth(false));
          dispatch(setAuthState(null));
          logout();
        }
        RNBootSplash.hide({fade: true});
      }
    };

    fetchData().catch(console.error);
  }, []);

  if (isAuth) {
    return (
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          screenOptions={{...StackDefaultOptions}}
          initialRouteName="HugeMenu2x2">
          <Stack.Screen name="HugeMenu2x2" component={HugeMenu} />
          <Stack.Screen name="HomePage" component={BottomTabNavigator} />
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
