import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import MapView, {PROVIDER_GOOGLE, PROVIDER_DEFAULT} from 'react-native-maps';
import AddressSelector from '../../../components/Order/AddressSelector';
import {GeolocationResponse} from '@react-native-community/geolocation';
import Spinner from 'react-native-spinkit';

export interface coordinatesType {
  coords: {
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
  };
  mocked: boolean;
  timestamp: number;
}

const Restaurants = () => {
  const [addressState, setAddressState] = useState<string>('');
  const [coordinates, setCoordinates] = useState<GeolocationResponse | null>(
    null,
  );

  const [isMapRedy, setIsMapRedy] = useState<boolean>(false);
  useEffect(() => {
    console.log(isMapRedy);
  }, [isMapRedy]);

  return (
    <LoggedInBackground>
      <AddressSelector
        coordinates={coordinates}
        setCoordinates={setCoordinates}
        addressState={addressState}
        setAddressState={setAddressState}
      />

      <MapView
        // provider={Platform.OS === 'ios' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
        provider={PROVIDER_GOOGLE}
        onMapReady={() => {
          console.log('map ready');
          setIsMapRedy(true);
        }}
        onMapLoaded={() => {
          console.log('map ready');
        }}
        style={{width: '100%', height: '100%'}}
        initialRegion={{
          latitude: 51.31,
          longitude: 0.06,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      <Text>Restaurants</Text>
    </LoggedInBackground>
  );
};

export default Restaurants;

const styles = StyleSheet.create({});
