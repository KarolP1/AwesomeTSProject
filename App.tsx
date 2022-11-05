/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';

import AuthNavigation from './src/navigation/auth/authNavigation';
import {StatusBar, LogBox} from 'react-native';
import {getStatus} from './src/redux/Auth/loginReducer';
import test from './src/redux/interceptors';
import {useAppDispatch} from './src/redux/hooks';

const App = () => {
  const authSucces = getStatus();
  const dispatch = useAppDispatch();
  test(dispatch);

  LogBox.ignoreLogs([
    "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
  ]);
  LogBox.ignoreLogs([
    'Sending `onAnimatedValueUpdate` with no listeners registered.',
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
