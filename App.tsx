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
import {getIsAuth, setIsAuth} from './src/redux/rootReducer';
import {getStatus} from './src/redux/Auth/loginReducer';

const App = () => {
  const authSucces = getStatus();

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
