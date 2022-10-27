import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

const TickButton = ({
  selected,
  setSelected,
  title,
}: {
  selected: boolean;
  title: string;
  setSelected: () => void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        setSelected();
      }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        width: '100%',
      }}>
      <View
        style={{
          width: 30,
          height: 30,
          borderColor: 'rgba(255, 255, 255,.6)',
          borderRadius: 5,
          borderWidth: 1,
          marginRight: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{fontFamily: 'Handlee-Regular', color: '#fff', fontSize: 20}}>
          {selected ? '✓' : ''}
        </Text>
      </View>
      <Text
        style={{fontFamily: 'Handlee-Regular', color: '#fff', fontSize: 15}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TickButton;

const styles = StyleSheet.create({});
