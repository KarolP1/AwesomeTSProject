import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IWorkspaceEmployeeList} from '../../redux/Order/tables/employees/GetEmployeeList.thunk';

const SimpleEmployee = ({employee}: {employee: IWorkspaceEmployeeList}) => {
  return (
    <View>
      <Text>
        {employee.workerId.first_name} {employee.workerId.last_name}
      </Text>
    </View>
  );
};

export default SimpleEmployee;

const styles = StyleSheet.create({});
