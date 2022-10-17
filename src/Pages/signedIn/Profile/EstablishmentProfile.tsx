import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EstablishmentContent from '../../../components/Profile/EstablishmentContent';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';

const EstablishmentProfile = () => {
  const state = useAppSelector(state => state.profile.data);
  const dispatch = useAppDispatch();
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
      }}>
      <EstablishmentContent profileInfo={state} />
    </View>
  );
};

export default EstablishmentProfile;

const styles = StyleSheet.create({});
