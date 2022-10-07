import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import StudentProfile from './StudentProfile';

const ProfileByRole = ({role}: {role: string | undefined}) => {
  switch (role) {
    case 'End User':
      return (
        <View>
          <Text>{role}</Text>
        </View>
      );
    case 'Student':
      return <StudentProfile />;
    case 'Local Cook':
      return (
        <View>
          <Text>{role}</Text>
        </View>
      );
    case 'Restaurant':
      return (
        <View>
          <Text>{role}</Text>
        </View>
      );
    case 'Food trucks':
      return (
        <View>
          <Text>{role}</Text>
        </View>
      );
    case 'Shop':
      return (
        <View>
          <Text>{role}</Text>
        </View>
      );

    default:
      return (
        <View>
          <Text>{role}</Text>
        </View>
      );
  }
};

export default ProfileByRole;

const styles = StyleSheet.create({});
