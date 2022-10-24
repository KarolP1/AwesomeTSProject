import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {ProfileNavigationProps} from '../../../navigation/Profile/ProfileNavigator.types';
import {WEBCONST} from '../../../constants/webConstants';
import DropShadow from 'react-native-drop-shadow';

const SingleEmployee = ({route}: ProfileNavigationProps) => {
  const {params} = route;
  const employee = params.employee;

  return (
    <LoggedInBackground>
      <View
        style={[
          {
            backgroundColor: '#E1F4FF',
            borderRadius: 5,
            alignItems: 'center',
            paddingVertical: 15,
            width: '100%',
          },
        ]}>
        {employee.worker.images?.profileImage ? (
          <DropShadow
            style={{
              shadowColor: '#4f4f4f',
              shadowOffset: {
                width: -2,
                height: 4,
              },
              shadowOpacity: 1,
              shadowRadius: 2,
              elevation: 2,
            }}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={{
                uri: `${WEBCONST().APIURL}${
                  employee.worker.images.profileImage.path
                }`,
              }}
            />
          </DropShadow>
        ) : (
          <DropShadow
            style={{
              shadowColor: '#4f4f4f',
              shadowOffset: {
                width: -2,
                height: 4,
              },
              shadowOpacity: 1,
              shadowRadius: 2,
              elevation: 2,
            }}>
            <DropShadow style={styles.imageBG}>
              <Image
                style={{width: '100%', height: '100%'}}
                source={require('../../../assets/utilityIcons/user.png')}
              />
            </DropShadow>
          </DropShadow>
        )}
        <Text style={{marginTop: 10, fontWeight: '600'}}>
          {employee.worker.first_name} {employee.worker.last_name}
        </Text>
        <Text
          style={{
            marginTop: 5,
            fontWeight: '600',
            textTransform: 'capitalize',
          }}>
          {employee.typeOfWork} {}
        </Text>
      </View>
      <Text>{JSON.stringify(params.employee)}</Text>
    </LoggedInBackground>
  );
};

export default SingleEmployee;

const styles = StyleSheet.create({
  imageBG: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: 80,
    height: 80,
    borderRadius: 100,
    overflow: 'hidden',
    padding: 5,
    paddingBottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
