import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ScrollView} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {useFocusEffect} from '@react-navigation/native';
import {GetNerbayEstablishment} from '../../redux/Order/Establishments/getNerbayEstablishments.thunk';
import SingleEstablishmentComponent from './SingleEstablishmentComponent';
import {GeolocationResponse} from '@react-native-community/geolocation';
import {IEstablishment} from '../../redux/Profile/types';

const EstablishmentsView = ({
  isOpen,
  setIsOpen,
  coordinates,
  setCoordinates,
}: {
  coordinates: GeolocationResponse | null;
  isOpen: boolean;
  setIsOpen: (establishment?: IEstablishment) => void;
  setCoordinates: React.Dispatch<
    React.SetStateAction<GeolocationResponse | null>
  >;
}) => {
  const animationHeight = useSharedValue(10);
  const animationRotatey = useSharedValue(180);
  const {height} = useWindowDimensions();
  const dispatch = useAppDispatch();
  const {data} = useAppSelector(state => state.findNerbayEstablishment);

  const filters = useAppSelector(state => state.App.orderFilters);
  useEffect(() => {
    console.log({filters});
  }, [filters]);

  const animationStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(animationHeight.value, {duration: 300}),
    };
  });
  useEffect(() => {
    animationHeight.value = isOpen ? 20 : height / 2;
    animationRotatey.value = isOpen ? 180 : 0;
  }, [isOpen]);
  const animationRotateyStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotateX: withTiming(`${animationRotatey.value}deg`, {duration: 200})},
      ],
    };
  });

  useEffect(() => {
    if (filters) {
      if (filters.lang && filters.lat && coordinates) {
        setCoordinates({
          ...coordinates,
          timestamp: new Date().getTime(),
          coords: {
            ...coordinates.coords,
            latitude: parseFloat(filters.lat),
            longitude: parseFloat(filters.lang),
          },
        });
      }
      dispatch(GetNerbayEstablishment({...filters, type: 'restaurant'}));
    } else {
      dispatch(GetNerbayEstablishment({type: 'restaurant'}));
    }
  }, [filters]);

  return (
    <Animated.View style={[{}, animationStyle]}>
      <TouchableOpacity
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        onPress={() => {
          animationHeight.value = isOpen ? 20 : height / 2;
          animationRotatey.value = isOpen ? 180 : 0;
          setIsOpen();
        }}>
        <Animated.Image
          style={[
            {height: 15, resizeMode: 'contain', marginBottom: 10},
            animationRotateyStyle,
          ]}
          source={require('../../assets/utilityIcons/arrowDown.png')}
        />
      </TouchableOpacity>
      <ScrollView style={{flex: 1}}>
        {data &&
          data.map(establishment => {
            return (
              <SingleEstablishmentComponent
                coordinates={coordinates}
                establishment={establishment}
                setIsOpen={setIsOpen}
                key={establishment._id}
              />
            );
          })}
      </ScrollView>
    </Animated.View>
  );
};

export default EstablishmentsView;

const styles = StyleSheet.create({});
