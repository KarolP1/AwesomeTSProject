import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../../../redux/hooks';
import {IEstablishment} from '../../../../redux/Profile/types';
import SimpleSection from '../infoScetion/SimpleSection';
import {TouchableOpacity} from 'react-native-gesture-handler';
import OpenHoursSection from './OpenHours/section';
import TablesSection from './TablesSection/section';
import EmployeesToAccept from './WorkSpaceSection/section';
import EmployeeList from './WorkSpaceSection/EmployeeList';

const EstablishmentJobSection = () => {
  const Establishment = useAppSelector(state => state.establishment);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [establishment, setEstablishment] = useState<IEstablishment | null>(
    null,
  );

  useEffect(() => {
    if (Establishment.error) {
      setErrorText(Establishment.error.message);
    }
    if (Establishment.data) {
      setEstablishment(Establishment.data[0]);
    }
  }, [Establishment]);

  return (
    <View>
      {establishment ? (
        <>
          {errorText && <Text>{errorText}</Text>}
          <OpenHoursSection />
          <TablesSection />
          <EmployeesToAccept establishmentId={establishment._id} />
          <EmployeeList establishmentId={establishment._id} />
        </>
      ) : (
        <View>
          <Text>You propably do not have registered establishment yet.</Text>
          <Text>Start working with us right now</Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#EA3651',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
              marginTop: 20,
            }}>
            <Text>Lets start</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default EstablishmentJobSection;

const styles = StyleSheet.create({});
