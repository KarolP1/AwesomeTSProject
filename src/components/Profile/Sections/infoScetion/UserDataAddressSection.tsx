import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {editMyProfileAddress} from '../../../../redux/Profile/core/profileAddressEditUserData.thunk';
import {IGetAddress} from '../../../../redux/Profile/types';
import TextInputProfile from '../../../TextInputs/TextInputProfile';
import SimpleSection from './SimpleSection';

const UserDataAdderssSection = ({
  info,
}: {
  info: IGetAddress | null | undefined;
}) => {
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector(state => state.profile.data);

  const [isEditModeEnabled, setIsEditModeEnabled] = useState<boolean>(false);
  const [infoState, setInfoDate] = useState<IGetAddress | undefined | null>(
    info,
  );

  return (
    <View>
      <SimpleSection
        isEditModeEnabled={isEditModeEnabled}
        title="Your Address"
        Button={() => (
          <TouchableOpacity
            onPress={() => {
              if (isEditModeEnabled)
                dispatch(
                  editMyProfileAddress({
                    address: infoState,
                    id: userDetails?._id,
                  }),
                );
              setIsEditModeEnabled(!isEditModeEnabled);
            }}>
            <Image
              style={{height: 20, aspectRatio: 1}}
              source={
                isEditModeEnabled
                  ? require('../../../../assets/utilityIcons/close.png')
                  : require('../../../../assets/utilityIcons/edit.png')
              }
            />
          </TouchableOpacity>
        )}>
        <View style={{width: '100%', flex: 1}}>
          <TextInputProfile
            disabled={isEditModeEnabled}
            name="city"
            onChange={setInfoDate}
            placeholder="City"
            value={infoState?.city}
            state={infoState}
            type="array"
          />
          <TextInputProfile
            disabled={isEditModeEnabled}
            name="country"
            onChange={setInfoDate}
            placeholder="Country"
            value={infoState?.country}
            state={infoState}
          />
          <TextInputProfile
            disabled={isEditModeEnabled}
            name="state"
            onChange={setInfoDate}
            placeholder="State"
            value={infoState?.state}
            state={infoState}
          />
          <TextInputProfile
            disabled={isEditModeEnabled}
            name="postcode"
            onChange={setInfoDate}
            placeholder="Postal code"
            value={infoState?.postcode}
            state={infoState}
          />
          <TextInputProfile
            disabled={isEditModeEnabled}
            name="street"
            onChange={setInfoDate}
            placeholder="Street "
            value={infoState?.street}
            state={infoState}
          />
          <TextInputProfile
            disabled={isEditModeEnabled}
            name="buildingnumber"
            onChange={setInfoDate}
            placeholder="Building Number"
            value={infoState?.buildingnumber}
            state={infoState}
          />
        </View>
      </SimpleSection>
    </View>
  );
};

export default UserDataAdderssSection;

const styles = StyleSheet.create({});
