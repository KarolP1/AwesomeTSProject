import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from 'react';
import {IWorkspaceEmployeeList} from '../../redux/Order/tables/employees/GetEmployeeList.thunk';
import {WEBCONST} from '../../constants/webConstants';
import DropShadow from 'react-native-drop-shadow';

const SimpleEmployee = ({employee}: {employee: IWorkspaceEmployeeList}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={{width: width / 1.4, maxWidth: 600, marginHorizontal: 5}}>
      <View
        style={{
          backgroundColor: '#E1F4FF',
          borderRadius: 5,
          alignItems: 'center',
          paddingVertical: 15,
        }}>
        {employee.worker.images?.profileImage ? (
          <DropShadow style={styles.imageBG}>
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
          <DropShadow style={styles.imageBG}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={require('../../assets/utilityIcons/user.png')}
            />
          </DropShadow>
        )}
        <Text>
          {employee.worker.first_name} {employee.worker.last_name}
        </Text>
      </View>
      <View >
        <Text>Status:</Text>
        <View>
          <Text>{employee.workerStatus}</Text>
        </View>
      </View>
    </View>
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
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 2,
  },
});
