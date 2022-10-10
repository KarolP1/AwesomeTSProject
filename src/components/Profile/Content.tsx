import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IGetProfileInfo} from '../../redux/Profile/types';
import ImageController from '../../controllers/recipe/ImageController';

import ProfileMenu from './ProfileMenu';
import BalanceSection from './BalanceSection';
import UserDataSection from './Sections/UserDataSection';
import UserDataAdderssSection from './Sections/UserDataAddressSection';
import CuisineSection from './Sections/AllergiesSection';
import AllergiesSection from './Sections/AllergiesSection';
import DocumentSection from './Sections/DocumentSection';
import {WEBCONST} from '../../constants/webConstants';
import FastImage from 'react-native-fast-image';
import {useAppSelector} from '../../redux/hooks';

const ProfileContent = ({
  profileInfo,
}: {
  profileInfo: IGetProfileInfo | null | undefined;
}) => {
  const [selected, setSelected] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [userInfo, setUserInfo] = useState<IGetProfileInfo | undefined | null>(
    profileInfo,
  );
  const user = useAppSelector(state => state.profile.data);
  useEffect(() => {
    setUserInfo(user);
  }, [profileInfo]);

  const renderSeciton = (selected: 0 | 1 | 2 | 3 | 4) => {
    switch (selected) {
      case 0:
        return (
          <>
            <BalanceSection />
            <UserDataSection info={profileInfo} />
            <UserDataAdderssSection info={profileInfo?.address[0]} />
            <AllergiesSection user={userInfo} />
            <DocumentSection document={profileInfo?.documentImages} />
          </>
        );

      default:
        <></>;
    }
  };
  return (
    <View style={{width: '100%'}}>
      <View>
        <ImageController user={profileInfo} />
      </View>

      <View style={{width: '100%'}}>
        <ProfileMenu selected={selected} setSelected={setSelected} />
      </View>
      {renderSeciton(selected)}
      <View style={{height: 40}}></View>
    </View>
  );
};

export default ProfileContent;
