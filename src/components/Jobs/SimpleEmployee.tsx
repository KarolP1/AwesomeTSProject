import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from 'react';
import {IWorkspaceEmployeeList} from '../../redux/Order/tables/employees/GetEmployeeList.thunk';
import {WEBCONST} from '../../constants/webConstants';
import DropShadow from 'react-native-drop-shadow';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Linking, Alert, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ProfileNavigation} from '../../navigation/Profile/ProfileNavigator.types';

const SimpleEmployee = ({employee}: {employee: IWorkspaceEmployeeList}) => {
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation<ProfileNavigation>();
  const callNumber = (phone: string) => {
    try {
      console.log('callNumber ----> ', phone);
      let phoneNumber = phone;
      if (Platform.OS !== 'android') {
        phoneNumber = `telprompt:${phone}`;
      } else {
        phoneNumber = `tel:${phone}`;
      }
      Linking.canOpenURL(phoneNumber)
        .then(supported => {
          if (!supported) {
            Alert.alert('Phone number is not available');
          } else {
            return Linking.openURL(phoneNumber);
          }
        })
        .catch(err => Alert.alert(err.message));
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  const navigateToEmployee = (employee: IWorkspaceEmployeeList) => {
    navigation.navigate('SingleEmployee', {employee});
  };

  return (
    <DropShadow
      style={[
        styles.shadow,
        {
          width: width / 1.4,
          maxWidth: 600,
          marginHorizontal: 5,
          backgroundColor: 'rgba(0,0,0,.1)',
          marginBottom: 15,
          borderRadius: 5,
          shadowColor: '#ccc',
          shadowOffset: {
            width: -2,
            height: 4,
          },
          shadowOpacity: 1,
          shadowRadius: 5,
          elevation: 2,
        },
      ]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigateToEmployee(employee)}>
        <View
          style={[
            {
              backgroundColor: '#E1F4FF',
              borderRadius: 5,
              alignItems: 'center',
              paddingVertical: 15,
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
                  source={require('../../assets/utilityIcons/user.png')}
                />
              </DropShadow>
            </DropShadow>
          )}
          <Text style={{marginTop: 10, fontWeight: '600'}}>
            {employee.worker.first_name} {employee.worker.last_name}
          </Text>
        </View>
        <View style={{}}>
          <View
            style={[
              {
                flexDirection: 'row',
                height: 80,
                alignItems: 'center',
                justifyContent: 'space-evenly',
              },
            ]}>
            <Text
              style={{
                color: '#fff',
                fontWeight: '900',
                textTransform: 'capitalize',
              }}>
              Status:
            </Text>

            <DropShadow
              style={{
                shadowColor: '#fff',
                shadowOffset: {
                  width: -2,
                  height: 2,
                },
                shadowOpacity: 1,
                shadowRadius: 5,
                elevation: 2,
              }}>
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,0.151)',
                  paddingVertical: 5,
                  paddingHorizontal: 20,
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '900',
                    textTransform: 'capitalize',
                  }}>
                  {employee.workerStatus}
                </Text>
              </View>
            </DropShadow>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: 'rgba(80,80,80)',
          flex: 1,
          paddingVertical: 5,
        }}
        onPress={() => {
          callNumber(employee.worker.phone_number);
        }}>
        <View>
          <Text style={{textAlign: 'center'}}>
            Contact with employee directly
          </Text>
        </View>
      </TouchableOpacity>
    </DropShadow>
  );
};

export default SimpleEmployee;

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
  shadow: {
    shadowColor: '#4f4f4f',
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2,
  },
});
