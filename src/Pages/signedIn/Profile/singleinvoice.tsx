import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {ProfileSingleInvoiceProps} from '../../../navigation/Profile/ProfileNavigator.types';

const Singleinvoice = () => {
  const route = useRoute<ProfileSingleInvoiceProps['route']>();
  const {invoice} = route.params;
  return (
    <View>
      <Text>{invoice._id}</Text>
    </View>
  );
};

export default Singleinvoice;

const styles = StyleSheet.create({});
