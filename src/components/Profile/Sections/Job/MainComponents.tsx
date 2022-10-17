import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import StandardJobDisplaySection from '../../../Jobs/StandardJobDisplaySection';
import {IJobsGet} from '../../../../redux/Profile/types';
import TipDisplaySection from '../../../Jobs/TipDisplaySection';
import WorkspaceSection from '../../../Jobs/WorkspaceSection';
import {getMyProfile} from '../../../../redux/Profile/core/profileCore.thunk';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SingleItem from '../../ProfileMenu/SingleItem';
import OnOfButton from './OnOfButton';
import EstablishmentJobSection from './EstablishmentJobSection';

const MainComponents = () => {
  const dispatch = useAppDispatch();
  const {data, error} = useAppSelector(state => state.profile);
  const [jobs, setJobs] = useState<IJobsGet[]>(data?.jobs ? data.jobs : []);
  const [userRole, setUserrole] = useState(data?.userRole);
  const [jobMenuStandardSelected, setJobMenuStandardSelected] =
    useState<boolean>(true);

  useEffect(() => {
    if (data?.jobs) setJobs(data.jobs);
  }, [data]);

  useEffect(() => {
    dispatch(getMyProfile());
  }, [error]);

  return (
    <View>
      {(userRole === 'Food trucks' ||
        userRole === 'Restaurant' ||
        userRole === 'Shop' ||
        userRole === 'Local Cook') && (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginVertical: 10,
            height: 40,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <OnOfButton
            title="standard"
            selected={jobMenuStandardSelected === true}
            setSelected={() => {
              setJobMenuStandardSelected(true);
            }}
          />
          <OnOfButton
            title={userRole}
            selected={jobMenuStandardSelected === false}
            setSelected={() => {
              setJobMenuStandardSelected(false);
            }}
          />
        </View>
      )}
      {jobMenuStandardSelected ? (
        <>
          <StandardJobDisplaySection jobs={jobs} />
          {jobs.length > 0 && <WorkspaceSection jobs={jobs} />}
          <TipDisplaySection balance={123.32} currency="pln" />
          <Text>standatd</Text>
        </>
      ) : (
        <EstablishmentJobSection />
      )}
    </View>
  );
};

export default MainComponents;

const styles = StyleSheet.create({});
