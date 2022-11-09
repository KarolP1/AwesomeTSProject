import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SimpleSection from './SimpleSection';
import {IEstablishment} from '../../../../redux/Profile/types';
import TextInputProfile from '../../../TextInputs/TextInputCuisine';
import SubmitButton from '../../../touchables/SubmitButton';
import Geolocation from '@react-native-community/geolocation';
import {useAppDispatch} from '../../../../redux/hooks';
import {
  EditEstablishmentPosition,
  IEstablishmentEdit,
} from '../../../../redux/Order/MyEstablishment/editEsablishment.thunk';

export interface ILatLong {
  lat: string;
  long: string;
}

const PositionLatLong = ({info}: {info: IEstablishment}) => {
  const dispatch = useAppDispatch();
  const [isEditModeEnabled, setIsEditModeEnabled] = useState<boolean>(false);
  const [latlong, setLatlong] = useState<ILatLong>({
    lat: '',
    long: '',
  });

  useEffect(() => {
    if (info.location) {
      setLatlong({
        lat: info.location.coordinates[1].toString(),
        long: info.location.coordinates[0].toString(),
      });
    }
  }, [info]);
  return (
    <SimpleSection
      title={'GPS position'}
      isEditModeEnabled={isEditModeEnabled}
      Button={() =>
        isEditModeEnabled ? (
          <>
            <TouchableOpacity
              onPress={() => {
                setIsEditModeEnabled(!isEditModeEnabled);
              }}>
              <Image
                source={require('../../../../assets/utilityIcons/add.png')}
                style={{width: 20, height: 20, transform: [{rotate: '45deg'}]}}
              />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => {
                setIsEditModeEnabled(!isEditModeEnabled);
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../../../assets/utilityIcons/edit.png')}
              />
            </TouchableOpacity>
          </>
        )
      }>
      {isEditModeEnabled && (
        <View>
          <TextInputProfile
            value={latlong.lat}
            name="lat"
            placeholder="Latitude ( number like latitude like 0.00000 )"
            state={latlong}
            onChange={setLatlong}
          />
          <TextInputProfile
            value={latlong.long}
            name="long"
            placeholder="Longitude ( number like Longitude like 0.00000 )"
            state={latlong}
            onChange={setLatlong}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
            }}>
            <SubmitButton
              style={{backgroundColor: '#4d4d4d'}}
              title="Use geolocation"
              onPress={() => {
                Geolocation.getCurrentPosition(info =>
                  setLatlong({
                    lat: info.coords.latitude.toString(),
                    long: info.coords.longitude.toString(),
                  }),
                );
              }}
            />
            <SubmitButton
              title="Submit"
              onPress={() => {
                if (validateLatLong(latlong)) {
                  if (latlong.lat && latlong.long) {
                    dispatch(
                      EditEstablishmentPosition([latlong.long, latlong.lat]),
                    );
                  }
                } else {
                  Alert.alert(
                    'Validation error',
                    'latitude or longitude is not valid',
                  );
                }
              }}
            />
          </View>
        </View>
        //TODO: check spelling
      )}
      {info.location?.coordinates && !isEditModeEnabled && (
        <>
          <TextInputProfile
            disabled
            value={info.location?.coordinates[1].toString()}
            name="lat"
            placeholder="Latitude ( number like latitude like 0.00000 )"
            state={latlong}
            onChange={setLatlong}
          />
          <TextInputProfile
            disabled
            value={info.location?.coordinates[0].toString()}
            name="long"
            placeholder="Longitude ( number like Longitude like 0.00000 )"
            state={latlong}
            onChange={setLatlong}
          />
        </>
      )}
      {!isEditModeEnabled && info.location?.coordinates === undefined && (
        <Text style={{color: '#fff'}}>
          You haven't set geolocation position to Your establishment yet
        </Text>
      )}
    </SimpleSection>
  );
};

export default PositionLatLong;

const styles = StyleSheet.create({});

const validateLatLong = ({lat, long}: ILatLong): boolean => {
  const latNum = parseFloat(lat);
  const lngNum = parseFloat(long);

  const validateLat = isLatitude(latNum);
  const validateLng = isLongitude(lngNum);
  return validateLat && validateLng;
};

function isLatitude(lat: number) {
  return isFinite(lat) && Math.abs(lat) <= 90;
}

function isLongitude(lng: number) {
  return isFinite(lng) && Math.abs(lng) <= 180;
}
