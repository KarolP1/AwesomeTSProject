import {Alert, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {IJobsGet, IJobTitle} from '../../redux/Profile/types';
import SimpleSection from '../Profile/Sections/infoScetion/SimpleSection';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DropShadow from 'react-native-drop-shadow';
import SimpleButton from '../Profile/Sections/infoScetion/simpleButton';
import {addNewJobRequest} from '../../redux/Profile/Jobs/addNewJobRequest';
import {getJobRequests} from '../../redux/Profile/Jobs/getJobs.thunk';
import {useFocusEffect} from '@react-navigation/native';
import {deleteJobRequests} from '../../redux/Profile/Jobs/deleteJob.thunk';

const StandardJobDisplaySection = ({jobs}: {jobs: IJobsGet[] | undefined}) => {
  const user = useAppSelector(state => state.profile);
  const dispatch = useAppDispatch();
  const [jobRequestForm, setJobRequestForm] = useState({
    workPlace: '',
    typeOfWork: '',
  });
  const [allJobs, setAllJobs] = useState(jobs ? jobs : []);
  const [isEditModeEnabled, setIsEditModeEnabled] = useState(false);
  useEffect(() => {
    if (jobs) return setAllJobs(jobs);
  }, [jobs]);

  const onChangeTextFunc = (text: string, name: 'workPlace' | 'typeOfWork') => {
    setJobRequestForm({...jobRequestForm, [name]: text.toLowerCase()});
  };

  const submitJobRequestForm = () => {
    if (
      jobRequestForm.typeOfWork !== 'chef' &&
      jobRequestForm.typeOfWork !== 'driver' &&
      jobRequestForm.typeOfWork !== 'waiter'
    ) {
      Alert.alert(
        'Validation failed',
        "role should be one of the following: 'driver', 'waiter' or 'chef'",
      );
    } else {
      dispatch(addNewJobRequest(jobRequestForm));
      setJobRequestForm({typeOfWork: '', workPlace: ''});
      setIsEditModeEnabled(false);
      dispatch(getJobRequests());
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getJobRequests());
    }, []),
  );

  return (
    <View>
      <SimpleSection
        isEditModeEnabled={isEditModeEnabled}
        title="I am currently working..."
        Button={() =>
          !isEditModeEnabled ? (
            <TouchableOpacity
              onPress={() => setIsEditModeEnabled(!isEditModeEnabled)}>
              <Image
                style={styles.smallIconSize}
                source={require('../../assets/utilityIcons/edit.png')}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setIsEditModeEnabled(!isEditModeEnabled)}>
              <Image
                style={styles.smallIconSizeClose}
                source={require('../../assets/utilityIcons/add.png')}
              />
            </TouchableOpacity>
          )
        }>
        {allJobs?.map(singleJob => (
          <DropShadow
            key={singleJob._id}
            style={{
              flex: 1,

              margin: 5,
              shadowColor: '#000',
              shadowOffset: {
                width: 10,
                height: 10,
              },
              shadowOpacity: 1,
              shadowRadius: 10,
              elevation: 1,
              borderRadius: 5,
              inset: 12,
              backgroundColor: 'rgba(255, 255, 255,0.1)',
              paddingVertical: 10,
              paddingHorizontal: 20,
              position: 'relative',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}>as a </Text>
              <Text>{singleJob.typeOfWork}</Text>
              <Text style={styles.text}> in </Text>
              <Text>
                {singleJob.workPlace?.name} / {singleJob.workPlace?.type}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                dispatch(deleteJobRequests(singleJob._id));
              }}
              activeOpacity={0}
              style={{
                zIndex: 100,
                alignSelf: 'flex-end',
                justifyContent: 'flex-end',
                display: isEditModeEnabled ? 'flex' : 'none',
              }}>
              <Image
                style={[styles.smallIconSize]}
                source={require('../../assets/utilityIcons/deleteC.png')}
              />
            </TouchableOpacity>
            <View
              style={{
                zIndex: 100,
                alignSelf: 'flex-end',
                justifyContent: 'flex-end',
                display: !isEditModeEnabled ? 'flex' : 'none',
              }}>
              <Image
                style={[styles.smallIconSize]}
                source={
                  !singleJob.isConfirmed
                    ? require('../../assets/utilityIcons/notConfirmed.png')
                    : require('../../assets/utilityIcons/confirmed.png')
                }
              />
            </View>
          </DropShadow>
        ))}
        {isEditModeEnabled && (
          <DropShadow
            style={{
              flex: 1,

              margin: 5,
              shadowColor: '#000',
              shadowOffset: {
                width: -2,
                height: 4,
              },
              shadowOpacity: 1,
              shadowRadius: 15,
              elevation: 1,
              borderRadius: 5,
              inset: 12,
              backgroundColor: 'rgba(255, 255, 255,0.1)',
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}>as a </Text>
              <TextInput
                value={jobRequestForm.typeOfWork}
                onChangeText={text => onChangeTextFunc(text, 'typeOfWork')}
                placeholder=" role ( waiter / driver / chef ) "
                editable={isEditModeEnabled}
              />
              <Text style={styles.text}> in </Text>
              <TextInput
                value={jobRequestForm.workPlace}
                onChangeText={text => onChangeTextFunc(text, 'workPlace')}
                placeholder=" establishment Id "
                editable={isEditModeEnabled}
              />
            </View>
            <View style={{flexDirection: 'row'}}></View>
            <TouchableOpacity
              onPress={submitJobRequestForm}
              style={{
                backgroundColor: '#EA3651',
                width: '50%',
                paddingVertical: 10,
                paddingHorizontal: 20,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                marginVertical: 10,
                alignSelf: 'flex-end',
              }}>
              <Text style={{color: '#fff'}}>New Job request</Text>
            </TouchableOpacity>
          </DropShadow>
        )}
      </SimpleSection>
    </View>
  );
};

export default StandardJobDisplaySection;

const styles = StyleSheet.create({
  smallIconSize: {
    height: 20,
    width: 20,
  },
  smallIconSizeClose: {
    height: 20,
    width: 20,
    transform: [{rotate: '45deg'}],
  },
  text: {
    color: '#fff',
  },
});
