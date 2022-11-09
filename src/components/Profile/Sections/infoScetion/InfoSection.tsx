import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BalanceSection from './BalanceSection';
import UserDataSection from './UserDataSection';
import UserDataAdderssSection from './UserDataAddressSection';
import AllergiesSection from './AllergiesSection';
import DocumentSection from './DocumentSection';
import {IEstablishment, IGetProfileInfo} from '../../../../redux/Profile/types';
import {useFocusEffect} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {GetEstablishment} from '../../../../redux/Order/order.thunk';
import {Counters} from '../../EstablishmentContent';
import {ICounter} from '../../../../redux/recipes/types';
import PositionLatLong from './PositionLatLong';

const InfoSection = ({
  profileInfo,
  userInfo,
}: {
  profileInfo: IGetProfileInfo | null | undefined;
  userInfo: IGetProfileInfo | null | undefined;
}) => {
  const dispatch = useAppDispatch();
  const estabData = useAppSelector(state => state.establishment.data);
  const [establishment, setEstablishment] = useState<IEstablishment | null>(
    null,
  );
  useFocusEffect(
    React.useCallback(() => {
      dispatch(GetEstablishment());
    }, []),
  );

  useEffect(() => {
    if (estabData && estabData.length > 0) {
      setEstablishment(estabData[0]);
    }
  }, [estabData]);

  const [counter, setCounter] = useState<ICounter | undefined>();
  useEffect(() => {
    if (establishment) setCounter(establishment.counter[0]);
  });
  return (
    <>
      {counter && <Counters counter={counter} />}
      <BalanceSection />
      <UserDataSection info={profileInfo} />
      <UserDataAdderssSection info={profileInfo?.address[0]} />
      {establishment?.address && (
        <UserDataAdderssSection info={establishment?.address} establishment />
      )}
      <AllergiesSection user={userInfo} />
      {profileInfo?.userRole === 'Student' && (
        <DocumentSection document={profileInfo?.documentImages} />
      )}
    </>
  );
};

export default InfoSection;

const styles = StyleSheet.create({});
