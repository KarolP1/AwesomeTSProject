import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IAllergy, IGetProfileInfo} from '../../../../redux/Profile/types';
import TextInputProfile from '../../../TextInputs/TextInputProfile';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  instance,
  refreshTokenInterveptor,
} from '../../../../redux/interceptors';
import {useAppDispatch} from '../../../../redux/hooks';
import {addAllergy} from '../../../../redux/Profile/allergies/addAllergy.thunk';
import {deleteAllergy} from '../../../../redux/Profile/allergies/deleteAllergy.thunk';
import {getMyProfile} from '../../../../redux/Profile/core/profileCore.thunk';
import SimpleSection from './SimpleSection';

const AllergiesSection = ({
  user,
}: {
  user: IGetProfileInfo | null | undefined;
}) => {
  const [allergies, setAllergies] = useState<string[] | undefined>(
    user?.allergies?.allergies,
  );
  const dispatch = useAppDispatch();
  refreshTokenInterveptor(dispatch, instance);
  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  const [isAddAllergyEnabled, setIsAddAllergyEnablrd] =
    useState<boolean>(false);
  const [newAllergy, setNewAllergy] = useState<string>('');

  return (
    <SimpleSection
      title="Allergies"
      isEditModeEnabled={isAddAllergyEnabled}
      Button={() =>
        isAddAllergyEnabled ? (
          <>
            <TouchableOpacity
              onPress={() => {
                setIsAddAllergyEnablrd(!isAddAllergyEnabled);
              }}>
              <Image
                source={require('../../../../assets/utilityIcons/add.png')}
                style={{width: 20, height: 20, transform: [{rotate: '45deg'}]}}
              />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => {
                setIsAddAllergyEnablrd(!isAddAllergyEnabled);
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../../../assets/utilityIcons/add.png')}
              />
            </TouchableOpacity>
          </>
        )
      }>
      <View style={{flex: 1, width: '100%'}}></View>
      {allergies?.map((allergyToMap, index) => (
        <View
          key={index}
          style={{
            position: 'relative',
            flexDirection: 'row',
            width: '100%',
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextInputProfile
            key={index}
            name="x"
            onChange={() => {}}
            placeholder="Add new allergy"
            value={allergyToMap}
            disabled={true}
          />
          {isAddAllergyEnabled && (
            <TouchableOpacity
              style={{paddingHorizontal: 10}}
              onPress={() => {
                const filterDeletedAllergies = allergies.filter(
                  e => e !== allergyToMap,
                );
                setAllergies(filterDeletedAllergies);
                dispatch(deleteAllergy(allergyToMap));
              }}>
              <Image
                source={require('../../../../assets/utilityIcons/add.png')}
                style={{
                  width: 20,
                  height: 20,
                  transform: [{rotate: '45deg'}],
                  right: 0,
                  alignSelf: 'center',
                  top: 0,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      ))}
      {isAddAllergyEnabled && (
        <>
          <TextInputProfile
            name="x"
            onChange={(text: string) => setNewAllergy(text)}
            placeholder="Add new allergy"
            value={newAllergy}
            disabled={true}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#EA3651',
              width: '50%',
              alignSelf: 'flex-end',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 5,
            }}
            onPress={() => {
              if (newAllergy) {
                if (!allergies) {
                  setAllergies([newAllergy]);
                } else {
                  setAllergies([...allergies, newAllergy]);
                }
                dispatch(addAllergy(newAllergy));
                setNewAllergy('');
              } else {
                Alert.alert('warning', 'you have to type you Allergy first');
              }
            }}>
            <Text style={{color: '#fff', textAlign: 'center'}}>
              Add new Allergy
            </Text>
          </TouchableOpacity>
        </>
      )}
    </SimpleSection>
  );
};

export default AllergiesSection;

const styles = StyleSheet.create({});
