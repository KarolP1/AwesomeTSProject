import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DropShadow from 'react-native-drop-shadow';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_API_KEY_IOS} from '../../../enviroments';

const AddressSelector = ({
  addressState,
  setAddressState,
  coordinates,
  setCoordinates,
}: {
  addressState: string;
  setAddressState: React.Dispatch<React.SetStateAction<string>>;
  coordinates: GeolocationResponse;
  setCoordinates: React.Dispatch<React.SetStateAction<GeolocationResponse>>;
}) => {
  useEffect(() => {
    if (coordinates) {
      setAddressState(
        `${coordinates.coords.latitude}  ${coordinates.coords.longitude}`,
      );
    }
  }, [coordinates]);
  return (
    <DropShadow
      style={{
        shadowColor: 'rgba(0, 0, 0,0.4)',
        shadowOffset: {
          width: -2,
          height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 1,
        borderRadius: 5,
        inset: 12,
        backgroundColor: 'rgba(255, 255, 255,0.1)',
      }}>
      <GooglePlacesAutocomplete
        renderLeftButton={() => (
          <TouchableOpacity
            onPress={() => {
              Geolocation.getCurrentPosition(info => setCoordinates(info));
            }}
            activeOpacity={0.8}
            style={{
              backgroundColor: 'rgba(79,79,79,.9)',
              height: '100%',
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../assets/utilityIcons/pin.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        )}
        styles={{
          textInputContainer: {
            backgroundColor: 'transparent',
            height: 50,
            borderRadius: 10,
            overflow: 'hidden',
          },
          textInput: {
            color: '#d7d7d7',
            fontSize: 16,
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0,0.1)',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
        placeholder="Search"
        fetchDetails={true}
        numberOfLines={10}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log({test: 'test'});
          // console.log(data, details);
          setCoordinates({
            ...coordinates,
            coords: {...coordinates.coords, ...details?.geometry.location},
          });
        }}
        query={{
          key: GOOGLE_API_KEY_IOS,
          language: 'en',
        }}
        renderRightButton={() => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: 'rgba(79,79,79,.9)',
              height: '100%',
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../assets/utilityIcons/Order/enter.png')}
              style={{
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </TouchableOpacity>
        )}
      />
    </DropShadow>
  );
};

export default AddressSelector;

const styles = StyleSheet.create({});
