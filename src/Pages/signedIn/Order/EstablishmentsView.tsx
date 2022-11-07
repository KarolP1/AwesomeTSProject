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
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {useFocusEffect} from '@react-navigation/native';
import {GetNerbayEstablishment} from '../../../redux/Order/Establishments/getNerbayEstablishments.thunk';

const EstablishmentsView = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const animationHeight = useSharedValue(10);
  const animationRotatey = useSharedValue(180);
  const {height} = useWindowDimensions();
  const dispatch = useAppDispatch();
  const {data} = useAppSelector(state => state.findNerbayEstablishment);

  const animationStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(animationHeight.value, {duration: 300}),
    };
  });
  const animationRotateyStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotateX: withTiming(`${animationRotatey.value}deg`, {duration: 200})},
      ],
    };
  });
  useEffect(() => {
    console.log(data);
  }, [data]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(GetNerbayEstablishment());
    }, []),
  );

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
          setIsOpen(!isOpen);
        }}>
        <Animated.Image
          style={[{height: 15, resizeMode: 'contain'}, animationRotateyStyle]}
          source={require('../../../assets/utilityIcons/arrowDown.png')}
        />
      </TouchableOpacity>
      <ScrollView style={{flex: 1}}></ScrollView>
    </Animated.View>
  );
};

export default EstablishmentsView;

const styles = StyleSheet.create({});
