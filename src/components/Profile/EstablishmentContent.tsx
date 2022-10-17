import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IGetProfileInfo} from '../../redux/Profile/types';
import ImageController from '../../controllers/recipe/ImageController';

import ProfileMenu from './ProfileMenu';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import InfoSection from './Sections/infoScetion/InfoSection';
import RecipesSection from './Sections/recipesSection/RecipesSection';
import MainComponents from './Sections/Job/MainComponents';
import {useFocusEffect} from '@react-navigation/native';
import {getMyProfile} from '../../redux/Profile/core/profileCore.thunk';

const EstablishmentContent = ({
  profileInfo,
}: {
  profileInfo: IGetProfileInfo | null | undefined;
}) => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [userInfo, setUserInfo] = useState<IGetProfileInfo | undefined | null>(
    profileInfo,
  );
  const user = useAppSelector(state => state.profile.data);
  useEffect(() => {
    setUserInfo(user);
  }, [profileInfo]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getMyProfile());
    }, []),
  );

  const renderSeciton = (selected: 0 | 1 | 2 | 3 | 4) => {
    switch (selected) {
      case 0:
        return <InfoSection profileInfo={profileInfo} userInfo={userInfo} />;

      case 1:
        return <RecipesSection />;
      case 3:
        return <MainComponents />;

      default:
        <></>;
    }
  };
  return (
    <View style={{width: '100%', flex: 1}}>
      <ImageController user={profileInfo} />

      <ProfileMenu selected={selected} setSelected={setSelected} />
      <View style={{flex: 1}}>{renderSeciton(selected)}</View>
    </View>
  );
};

export default EstablishmentContent;
