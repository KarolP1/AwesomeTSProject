import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import UserDataAdderssSection from '../../../components/Profile/Sections/infoScetion/UserDataAddressSection';
import AddressSelector from '../../../components/Order/AddressSelector';
import {GeolocationResponse} from '@react-native-community/geolocation';

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
  return (
    <LoggedInBackground>
      <AddressSelector
        coordinates={coordinates}
        setCoordinates={setCoordinates}
        addressState={addressState}
        setAddressState={setAddressState}
      />
      <Text>Restaurants</Text>
    </LoggedInBackground>
  );
};

export default Restaurants;

const styles = StyleSheet.create({});
