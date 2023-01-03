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
  useWindowDimensions,
} from 'react-native';
import React, {ReactNode, useEffect, useState} from 'react';
import {logout} from '../../utils/localStorage';
import {useAppDispatch} from '../../redux/hooks';
import {cleanUpLogin, setAuthState} from '../../redux/Auth/loginReducer';
import {useNavigation} from '@react-navigation/native';
import MenuButtonsList from '../SideMenu/MenuButtonsList';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const LoggedInBackground = ({
  children,
  stickyButton,
  disabledScroll,
}: {
  children?: ReactNode;
  disabledScroll?: boolean;
  stickyButton?: () => JSX.Element;
}) => {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: !isMenuOpen
            ? withTiming(offset.value, {duration: 200})
            : withDelay(300, offset.value),
        },
      ],
    };
  });

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {width} = useWindowDimensions();
  useEffect(() => {
    if (!isMenuOpen) {
      offset.value = width;
    } else {
      offset.value = 0;
    }
  }, [isMenuOpen]);

  return (
    <ImageBackground
      style={styles.loggedOutBackground}
      source={require('../../../src/assets/background.png')}>
      <SafeAreaView style={styles.mainContainer}>
        <Animated.View
          style={[
            {
              flex: 1,
              position: 'absolute',
              backgroundColor: '#00000005',
              width: '100%',
              zIndex: 999,
              top: 0,
              bottom: 0,
            },
            animatedStyles,
          ]}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            style={{
              flex: 1,
              height: '100%',
              width: '100%',
              alignItems: 'flex-end',
              marginBottom: 50,
              paddingRight: 20,
              paddingTop: 110,
            }}>
            <MenuButtonsList
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              offset={offset}
            />
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.logoFull}>
          {navigation.canGoBack() && (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                navigation.goBack();
              }}
              style={{zIndex: 100000, position: 'absolute', top: 0, left: 10}}>
              <Image
                style={{height: 40, width: 40}}
                source={require('../../assets/utilityIcons/BackArrow.png')}
              />
            </TouchableOpacity>
          )}
          <Image
            style={{
              flex: 1,
              resizeMode: 'center',
              alignSelf: 'center',
            }}
            source={require('../../assets/BLINKFIX.png')}
          />

          <TouchableOpacity
            activeOpacity={1}
            style={{zIndex: 100000, position: 'absolute', top: 0, right: 10}}
            onPress={() => {
              setIsMenuOpen(!isMenuOpen);
            }}>
            <Image
              source={
                isMenuOpen
                  ? require('../../assets/utilityIcons/menuIcons/menuOpen.png')
                  : require('../../assets/utilityIcons/menuIcons/menuClose.png')
              }
            />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView
          style={[styles.innerContainer, {marginBottom: 50}]}>
          <ScrollView
            scrollEventThrottle={16}
            style={{
              width: '100%',
            }}
            scrollEnabled={disabledScroll}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: 'center',
              paddingBottom: -150,
            }}>
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
    zIndex: 1000,
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
