import React, {useEffect} from 'react';
import LoginPage from '../../Pages/signedOut/loginPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackDefaultOptions} from '../../options/stackDefaultOptions';
import RegisterPage from '../../Pages/signedOut/registerPage/registerPage';
import {HomePageProp, HomeStackParamList, RootStackParamList} from '../types';
import HugeMenu from '../../Pages/signedIn/menu/HugeMenu';

import BottomTabNavigator from '../Home/bottomTabNavigator';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {linking, linkingLoggedOut} from '../../../linking';
import {getTokensKeychain, logout} from '../../utils/localStorage';
import RNBootSplash from 'react-native-bootsplash';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {setIsAuth} from '../../redux/rootReducer';
import {setAuthState} from '../../redux/Auth/loginReducer';
import {tokenThunk} from '../../redux/Auth/thunks';
import LinkingPage from '../../Pages/signedIn/LinkingPage';
import {Linking, Text} from 'react-native';

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
    const fetchData = async () => {
      const tokens = await getTokensKeychain();
      if (!tokens) {
        console.log('there is no token');
        dispatch(setIsAuth(false));
        dispatch(setAuthState(null));
      } else {
        console.log('there is token');
        dispatch(tokenThunk());
        console.log('running thunk action');
      }
    };
    fetchData()
      .then(() => {
        console.log(data);
        if (
          data &&
          data.access_token !== undefined &&
          data.refresh_token !== undefined
        ) {
          console.log('there is data');
          dispatch(setAuthState(data));
          dispatch(setIsAuth(true));
        }
        if (error) {
          console.log('there is error');
          dispatch(setIsAuth(false));
          dispatch(setAuthState(null));
          logout();
        } else {
          dispatch(setIsAuth(false));
          dispatch(setAuthState(null));
          logout();
        }
        RNBootSplash.hide({fade: true});
      })
      .catch(console.error);
    Linking.addEventListener('url', _handleOpenUrl);
  }, [error]);
  useEffect(() => {
    Linking.addEventListener('url', _handleOpenUrl);
    return () => {
      Linking.removeAllListeners('url');
    };
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
