import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SimpleSection = ({
  children,
  title,
  balance,
  currency,
  Button,
  isEditModeEnabled,
}: {
  children: React.ReactNode;
  title: string;
  balance?: number;
  currency?: string;
  Button?: () => JSX.Element;
  isEditModeEnabled?: boolean;
}) => {
  return (
    <View>
      <View
        style={{
          width: '100%',
          backgroundColor: isEditModeEnabled ? '#EA3651' : '#464646',
          paddingVertical: 15,
          paddingHorizontal: 15,
          marginVertical: 10,
          borderRadius: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>{title}</Text>
        {Button && <Button />}
        {balance && currency && (
          <Text style={{color: '#fff', fontWeight: '900'}}>
            {balance.toString()} {currency}
          </Text>
        )}
      </View>
      <View>{children}</View>
    </View>
  );
};

export default SimpleSection;

const styles = StyleSheet.create({});
