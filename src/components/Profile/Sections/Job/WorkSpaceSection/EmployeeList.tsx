import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {useFocusEffect} from '@react-navigation/native';
import {GetEmployeeList} from '../../../../../redux/Order/tables/employees/GetEmployeeList.thunk';
import SimpleSection from '../../infoScetion/SimpleSection';
import SimpleEmployee from '../../../../Jobs/SimpleEmployee';

const EmployeeList = ({establishmentId}: {establishmentId: string}) => {
  const employeThunks = useAppSelector(state => state.employees);
  const dispatch = useAppDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch(GetEmployeeList(establishmentId));
    }, []),
  );
  return (
    <View>
      {employeThunks.data?.map(list => {
        return (
          <SimpleSection key={list._id} title={list._id + 's'}>
            {list.employees?.map(employee => (
              <SimpleEmployee employee={employee} />
            ))}
          </SimpleSection>
        );
      })}
    </View>
  );
};

export default EmployeeList;

const styles = StyleSheet.create({});
