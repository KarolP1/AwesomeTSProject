import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {ReactNode} from 'react';

const LoggedInBackground = ({children}: {children?: ReactNode}) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ImageBackground
        style={styles.loggedOutBackground}
        source={require('../../../src/assets/background.png')}>
        <Image
          style={styles.logoFull}
          source={require('../../assets/BLINKFIX.png')}
        />
        <KeyboardAvoidingView style={styles.innerContainer}>
          <ScrollView
            style={{
              width: '100%',
            }}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: 'center',
            }}>
            {children ? children : <Text>hello</Text>}
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoggedInBackground;
const styles = StyleSheet.create({
  loggedOutBackground: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  logoFull: {
    width: '100%',
    height: 40,
    resizeMode: 'contain',
    marginTop: 10,
  },

  innerContainer: {
    width: '98%',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginBottom: 90,
  },
});
