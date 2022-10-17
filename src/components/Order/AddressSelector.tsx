import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DropShadow from 'react-native-drop-shadow';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';

const AddressSelector = ({
  addressState,
  setAddressState,
  coordinates,
  setCoordinates,
}: {
  addressState: string;
  setAddressState: React.Dispatch<React.SetStateAction<string>>;
  coordinates: GeolocationResponse | null;
  setCoordinates: React.Dispatch<
    React.SetStateAction<GeolocationResponse | null>
  >;
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
        flexDirection: 'row',
        borderRadius: 15,
        overflow: 'hidden',
        height: 60,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
          width: -2,
          height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 2,
      }}>
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
      <TextInput
        placeholder="Type you address or use geolocation"
        value={addressState}
        placeholderTextColor="#ffe"
        style={{
          flex: 1,
          paddingHorizontal: 10,
          backgroundColor: 'rgba(0,0,0,0.04)',
          color: '#fff',
        }}
        onChangeText={text => {
          setAddressState(text);
        }}
        onPressIn={() => setAddressState('')}
      />
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
    </DropShadow>
  );
};

export default AddressSelector;

const styles = StyleSheet.create({});
