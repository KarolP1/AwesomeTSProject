import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DropShadow from 'react-native-drop-shadow';

const SmallIconBG = ({children}: {children: React.ReactNode}) => {
  return (
    <View
      style={{
        width: 45,
        aspectRatio: 1,
        backgroundColor: 'rgba(255,255,255,0.15)',
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
      }}>
      <DropShadow style={styles.ContainerSmall}>{children}</DropShadow>
    </View>
  );
};

export default SmallIconBG;

const styles = StyleSheet.create({
  ContainerSmall: {
    width: 50,

    aspectRatio: 1,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth: 1,
    elevation: 2,
    shadowRadius: 10,
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 1,
  },
});
