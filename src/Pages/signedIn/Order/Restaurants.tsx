import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import AddressSelector from '../../../components/Order/AddressSelector';
import {GeolocationResponse} from '@react-native-community/geolocation';
import Spinner from 'react-native-spinkit';
import {useAppSelector} from '../../../redux/hooks';
import {ScrollView} from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import EstablishmentsView from './EstablishmentsView';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {MenuItemButton} from '../../../components/Order/MenuItemButton';

Geolocation.setRNConfiguration({skipPermissionRequests: false});

export interface coordinatesType {
  coords: {
    accuracy?: number;
    altitude?: number;
    altitudeAccuracy?: number;
    heading?: number;
    latitude: number;
    longitude: number;
    speed?: number;
  };
  mocked?: boolean;
  timestamp?: number;
}

const Restaurants = () => {
  const animationRotation = useSharedValue(0);
  const animationSide = useSharedValue(-200);
  const [isExtraButtonRotated, setIsExtraButtonRotated] = useState(false);
  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotate: withTiming(`${animationRotation.value}deg`, {duration: 400})},
      ],
    };
  });
  const animationSideStyle = useAnimatedStyle(() => {
    return {
      right: withTiming(animationSide.value, {duration: 200}),
    };
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const userInfo = useAppSelector(state => state.profile.data);
  const [addressState, setAddressState] = useState<string>('');
  const [coordinates, setCoordinates] = useState<GeolocationResponse>({
    coords: {
      latitude: 50.0433682,
      longitude: 19.8822381,
      accuracy: 1,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    },
    timestamp: new Date().valueOf(),
  });

  const {height} = useWindowDimensions();

  const [isMapRedy, setIsMapRedy] = useState<boolean>(false);

  const ref = useRef(null);
  const markerref = useRef(null);
  useEffect(() => {
    if (ref)
      //@ts-ignore
      ref.current.animateToRegion(
        {
          longitude: coordinates.coords.longitude,
          latitude: coordinates.coords.latitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000,
      );
  }, [coordinates]);

  const extraMenuRef = useRef(null);

  return (
    <LoggedInBackground
      disabledScroll
      stickyButton={() => (
        <TouchableOpacity
          onPress={() => {
            animationRotation.value = isExtraButtonRotated ? 1440 : 0;
            animationSide.value = isExtraButtonRotated ? -200 : 0;
            setIsExtraButtonRotated(!isExtraButtonRotated);
          }}
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: '#4d4d4d',
            padding: 2,
            justifyContent: 'center',
          }}>
          <Animated.Image
            style={[{alignSelf: 'center', margin: 2}, animationStyle]}
            source={require('../../../assets/utilityIcons/3dots.png')}
          />
        </TouchableOpacity>
      )}>
      <Animated.View
        ref={extraMenuRef}
        style={[
          {
            width: 200,
            position: 'absolute',
            zIndex: 100,
            bottom: 60,
          },
          animationSideStyle,
        ]}>
        <MenuItemButton title="Extra filters" />
      </Animated.View>
      <ScrollView
        style={{
          width: '100%',
          flexDirection: 'column',
          flex: 1,
          height: '100%',
        }}
        horizontal
        scrollEnabled={false}>
        <View
          style={{
            width: '100%',
            flexDirection: 'column',
            flexGrow: 1,
            flex: 1,
            minHeight: height - 200,
          }}>
          <AddressSelector
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            addressState={addressState}
            setAddressState={setAddressState}
          />

          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              display: isMapRedy ? 'none' : 'flex',
              bottom: 0,
            }}>
            <Spinner
              // style={styles.spinner}
              isVisible={!isMapRedy}
              size={100}
              type={'ThreeBounce'}
              color={'#EA3651'}
            />
          </View>

          <MapView
            onResponderMove={() => setIsOpen(true)}
            ref={ref}
            mapType="hybrid"
            provider={PROVIDER_GOOGLE}
            onPress={val => {
              setIsOpen(true);
              const {latitude, longitude} = val.nativeEvent.coordinate;
              if (coordinates)
                setCoordinates({
                  ...coordinates,
                  coords: {...coordinates.coords, latitude, longitude},
                });
              else {
                setCoordinates({
                  timestamp: new Date().valueOf(),
                  coords: {
                    latitude,
                    longitude,
                    altitude: null,
                    altitudeAccuracy: null,
                    heading: null,
                    speed: null,
                    accuracy: 1,
                  },
                });
              }
            }}
            onMapReady={() => {
              setIsMapRedy(true);
            }}
            onMapLoaded={() => {
              setIsMapRedy(true);
            }}
            style={{
              width: '100%',
              marginTop: 10,
              marginBottom: 5,
              opacity: isMapRedy ? 1 : 0,
              borderRadius: 10,
              flex: 1,
            }}
            initialRegion={{
              latitude: coordinates.coords.latitude,
              longitude: coordinates.coords.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.0421,
            }}>
            <Text>{userInfo?.images?.profileImage?.path}</Text>

            <Marker
              ref={markerref}
              coordinate={{
                latitude: coordinates.coords.latitude,
                longitude: coordinates.coords.longitude,
              }}
            />
          </MapView>

          <EstablishmentsView isOpen={isOpen} setIsOpen={setIsOpen} />
        </View>
      </ScrollView>
    </LoggedInBackground>
  );
};

export default Restaurants;

const styles = StyleSheet.create({});
