import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';

export const MenuItemButton = ({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
}) => {
  return (
    <Animated.View
      style={{
        backgroundColor: '#4d4d4d',
        height: 40,
        marginTop: 5,
        borderRadius: 40,
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#fff', fontWeight: '900'}}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
