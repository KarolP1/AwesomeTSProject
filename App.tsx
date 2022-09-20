/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import {useSelector, useDispatch} from 'react-redux';

import React, {useEffect} from 'react';
import axios from 'axios';

import AuthNavigation from './src/navigation/authNavigation';
import {StatusBar} from 'react-native';
import {
  getStatus,
  getTokens,
  setAuthStatus,
} from './src/redux/Auth/loginReducer';
import {logout} from './src/utils/localStorage';
import {useAppDispatch} from './src/redux/hooks';
import {instance} from './src/redux/interceptors';
import {tokenThunk} from './src/redux/Auth/thunks';

const App = () => {
  const authSucces = getStatus();
  const tokens = getTokens();

  axios.interceptors.request.use((request: any) => {
    if (!request.headers.Authorization) {
      request.headers.Authorization = `Bearer ${tokens?.access_token}`;
    }
    return request;
  });

  return (
    <>
      <AuthNavigation isAuth={authSucces} />
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'rgba(0,0,0,0.15)'}
      />
    </>
  );
};

export default App;
