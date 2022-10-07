import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProfileContent from '../../../components/Profile/Content';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {instance, refreshTokenInterveptor} from '../../../redux/interceptors';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const StudentProfile = () => {
  const state = useAppSelector(state => state.profile.data);
  const dispatch = useAppDispatch();
  refreshTokenInterveptor(dispatch, instance);

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
      }}>
      <ProfileContent profileInfo={state} />
    </View>
  );
};

export default StudentProfile;

const styles = StyleSheet.create({
  animatedContainer: {
    width: '100%',
    height: SCREEN_HEIGHT - 150,
    left: 0,
  },
});
