import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {ReactNode} from 'react';
import {logout} from '../../utils/localStorage';
import {useAppDispatch} from '../../redux/hooks';
import {cleanUpLogin, setAuthState} from '../../redux/Auth/loginReducer';
import {useNavigation} from '@react-navigation/native';

const LoggedInBackground = ({children}: {children?: ReactNode}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ImageBackground
        style={styles.loggedOutBackground}
        source={require('../../../src/assets/background.png')}>
        <View style={styles.logoFull}>
          {navigation.canGoBack() && (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Text>Back</Text>
            </TouchableOpacity>
          )}
          <Image
            style={{flex: 1, resizeMode: 'center'}}
            source={require('../../assets/BLINKFIX.png')}
          />
          <TouchableOpacity
            onPress={() => {
              logout();
              dispatch(cleanUpLogin());
              dispatch(setAuthState(false));
            }}>
            <Text>logout</Text>
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView style={styles.innerContainer}>
          <ScrollView
            nestedScrollEnabled={true}
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
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
