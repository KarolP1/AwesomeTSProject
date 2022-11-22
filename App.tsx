/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import AuthNavigation from './src/navigation/auth/authNavigation';
import {StatusBar, LogBox, Linking} from 'react-native';
import {getStatus} from './src/redux/Auth/loginReducer';
import test from './src/redux/interceptors';
import {useAppDispatch, useAppSelector} from './src/redux/hooks';
import {StripeProvider} from '@stripe/stripe-react-native';

const App = () => {
  const authSucces = getStatus();
  const {isLoading} = useAppSelector(state => state.login);

  const dispatch = useAppDispatch();
  test(dispatch);
  LogBox.ignoreLogs([
    'Sending `onAnimatedValueUpdate` with no listeners registered.',
  ]);

  return (
    <>
      <StripeProvider
        publishableKey="pk_test_51KEGezEn6xUPj18MtUQIUTrP4GpPySC5MLphN98WScc3sA1UV6nKSEYvVipch7l9dlNlaBiQl4AwomCmcscoXRKg00lDIcg5HP"
        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        merchantIdentifier="merchant.me.fix.blink" // required for Apple Pay
      >
        <AuthNavigation isAuth={authSucces} />
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'rgba(0,0,0,0.15)'}
        />
      </StripeProvider>
    </>
  );
};

export default App;
