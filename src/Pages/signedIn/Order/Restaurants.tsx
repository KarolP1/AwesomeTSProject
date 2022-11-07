import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import AddressSelector from '../../../components/Order/AddressSelector';
import {GeolocationResponse} from '@react-native-community/geolocation';
import Spinner from 'react-native-spinkit';
import {useAppSelector} from '../../../redux/hooks';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_API_KEY_IOS} from '../../../../enviroments';
import {ScrollView} from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';

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

  const [isMapRedy, setIsMapRedy] = useState<boolean>(true);

  // useEffect(() => {
  //   console.log({coordinates});
  // }, [coordinates]);
  // const ref = useRef(null);
  // useEffect(() => {
  //   //@ts-ignore
  //   if (ref) ref.current.fitToElements(true);
  // }, [coordinates]);

  return (
    <LoggedInBackground disabledScroll>
      <ScrollView
        style={{width: '100%', flexDirection: 'column'}}
        horizontal
        scrollEnabled={false}>
        <View style={{width: '100%', flexDirection: 'column'}}>
          <AddressSelector
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            addressState={addressState}
            setAddressState={setAddressState}
          />

          <View
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              opacity: !isMapRedy ? 1 : 0,
              display: isMapRedy ? 'none' : 'flex',
            }}>
            <Spinner
              // style={styles.spinner}
              isVisible={!isMapRedy}
              size={100}
              type={'ThreeBounce'}
              color={'#EA3651'}
            />
          </View>
          {/* <MapView
        ref={ref}
        mapType="hybrid"
        provider={PROVIDER_GOOGLE}
        onPress={val => {
          console.log(val);
          const {latitude, longitude} = val.nativeEvent.coordinate;
          const timeout = setTimeout(() => {
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
          }, 2000);
          return () => clearTimeout(timeout);
        }}
        onMapReady={() => {
          setIsMapRedy(true);
        }}
        onMapLoaded={() => {
          setIsMapRedy(true);
        }}
        style={{
          width: '100%',
          flex: 1,
          marginTop: 10,
          marginBottom: 5,
          opacity: isMapRedy ? 1 : 0,
          borderRadius: 10,
        }}
        initialRegion={{
          latitude: coordinates.coords.latitude,
          longitude: coordinates.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.0421,
        }}>
        <Text>{userInfo?.images?.profileImage?.path}</Text>

        <Marker
          coordinate={{
            latitude: coordinates.coords.latitude,
            longitude: coordinates.coords.longitude,
          }}
        />
      </MapView> */}

          <Text>Restaurants</Text>
        </View>
      </ScrollView>
    </LoggedInBackground>
  );
};

export default Restaurants;

const styles = StyleSheet.create({});
