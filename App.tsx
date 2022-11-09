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
import {StatusBar, LogBox, Linking} from 'react-native';
import {getStatus} from './src/redux/Auth/loginReducer';
import test from './src/redux/interceptors';
import {useAppDispatch, useAppSelector} from './src/redux/hooks';

const App = () => {
  const authSucces = getStatus();
  const {isLoading} = useAppSelector(state => state.login);

  const dispatch = useAppDispatch();
  test(dispatch);
  LogBox.ignoreLogs([
    'Sending `onAnimatedValueUpdate` with no listeners registered.',
  ]);

  useEffect(() => {
    function addLinkingEventListener() {
      Linking.addEventListener('url', evt => {
        console.log({url: evt});
        // handleURL(evt?.url);
      });
    }

    Linking.getInitialURL()
      .then(initUrl => {
        // handleURL;
        if (initUrl) {
          Linking.openURL(initUrl);
          console.info(initUrl);
        }
      })
      .catch(e => console.error(e))
      .finally(() => {
        addLinkingEventListener();
      });

    // return () => {
    //   Linking.removeEventListener('url', handleUrlEvent);
    // };
  }, []);

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
