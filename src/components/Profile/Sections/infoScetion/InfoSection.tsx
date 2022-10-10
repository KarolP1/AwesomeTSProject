import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BalanceSection from './BalanceSection';
import UserDataSection from './UserDataSection';
import UserDataAdderssSection from './UserDataAddressSection';
import AllergiesSection from './AllergiesSection';
import DocumentSection from './DocumentSection';
import {IGetProfileInfo} from '../../../../redux/Profile/types';

const InfoSection = ({
  profileInfo,
  userInfo,
}: {
  profileInfo: IGetProfileInfo | null | undefined;
  userInfo: IGetProfileInfo | null | undefined;
}) => {
  return (
    <>
      <BalanceSection />
      <UserDataSection info={profileInfo} />
      <UserDataAdderssSection info={profileInfo?.address[0]} />
      <AllergiesSection user={userInfo} />
      <DocumentSection document={profileInfo?.documentImages} />
    </>
  );
};

export default InfoSection;

const styles = StyleSheet.create({});
