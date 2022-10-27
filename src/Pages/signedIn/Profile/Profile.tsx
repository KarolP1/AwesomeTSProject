import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {instance} from '../../../redux/interceptors';
import {useFocusEffect} from '@react-navigation/native';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import ProfileByRole from './ProfileByRole';
import {logout} from '../../../utils/localStorage';
import {getMyProfile} from '../../../redux/Profile/core/profileCore.thunk';
import {getMyEstabishmentMenus} from '../../../redux/Profile/establishmentMenus/EstablishmentMenu.thunk';

const Profile = () => {
  const {data, error} = useAppSelector(state => state.profile);
  const dispatch = useAppDispatch();
  const userRole = data?.userRole;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getMyProfile());
    }, []),
  );
  return (
    <LoggedInBackground>
      <ProfileByRole role={userRole} />
    </LoggedInBackground>
  );
};

export default Profile;

const styles = StyleSheet.create({});
