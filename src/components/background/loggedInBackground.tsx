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
  Platform,
} from 'react-native';
import React, {ReactNode, useEffect, useState} from 'react';
import {logout} from '../../utils/localStorage';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {cleanUpLogin, setAuthState} from '../../redux/Auth/loginReducer';
import {useNavigation} from '@react-navigation/native';
import {setScrollPosition} from '../../redux/App/setup.sicle';

const LoggedInBackground = ({
  children,
  stickyButton,
}: {
  children?: ReactNode;
  stickyButton?: () => JSX.Element;
}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {isViewScrollable} = useAppSelector(state => state.App);
  const [pos, setPos] = useState(0);
  useEffect(() => {
    dispatch(setScrollPosition(pos));
  }, [pos]);

  return (
    <ImageBackground
      style={styles.loggedOutBackground}
      source={require('../../../src/assets/background.png')}>
      <SafeAreaView style={styles.mainContainer}>
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
        <KeyboardAvoidingView
          style={[styles.innerContainer, {marginBottom: 50}]}>
          <ScrollView
            scrollEventThrottle={16}
            style={{
              width: '100%',
            }}
            scrollEnabled={isViewScrollable}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: 'center',
            }}
            onScroll={e => setPos(e.nativeEvent.contentOffset.y)}>
            {children ? children : <Text>hello</Text>}
          </ScrollView>
          {stickyButton && (
            <View
              style={{
                width: 40,
                height: 40,
                position: 'absolute',
                margin: 5,
                bottom: 10,
                right: 10,
                borderRadius: 500,
                overflow: 'hidden',
              }}>
              {stickyButton()}
            </View>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
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
