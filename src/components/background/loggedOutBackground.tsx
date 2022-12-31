import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React, {ReactNode} from 'react';

const LoggedOutBackground = ({children}: {children?: ReactNode}) => {
  const {height} = useWindowDimensions();
  return (
    <View style={[styles.mainContainer, {height}]}>
      <ImageBackground
        style={styles.loggedOutBackground}
        source={require('../../../src/assets/background.png')}>
        <Image
          style={styles.logoFull}
          source={require('../../assets/BLINKFIX.png')}
        />
        <KeyboardAvoidingView style={styles.innerContainer}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
            {children ? children : <Text>hello</Text>}
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

export default LoggedOutBackground;
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
    width: '70%',
    height: 100,
    resizeMode: 'contain',
    top: 20,
    marginBottom: '10%',
  },
  innerContainer: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    width: '95%',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    minHeight: '50%',
    flex: 0.7,
    marginBottom: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
