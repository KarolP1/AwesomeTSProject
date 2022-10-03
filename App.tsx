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
import {StatusBar, LogBox} from 'react-native';
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

  LogBox.ignoreLogs([
    "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
  ]);
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
