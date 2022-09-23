import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useCardAnimation} from '@react-navigation/stack';
import {SpicenessList} from '../../static/spiceness';

const SpicenessSelector = () => {
  const spicenessList = SpicenessList();
  const [selected, setSelected] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={{width: '100%'}}>
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        key={spicenessList[selected].id}
        style={{
          flexDirection: 'row-reverse',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 50,
          paddingVertical: 5,
          borderRadius: 5,
          backgroundColor: 'rgba(0,0,0,0.15)',
        }}>
        <Image
          source={spicenessList[selected].icon}
          style={{width: 40, aspectRatio: 1}}
        />
        <Text>{spicenessList[selected].name}</Text>
      </TouchableOpacity>

      <View
        style={{
          width: '100%',
          height: !isOpen ? 0 : '100%',
          opacity: !isOpen ? 0 : 1,
          display: !isOpen ? 'none' : 'flex',
          maxHeight: 200,
        }}>
        {spicenessList.map(spiceness => (
          <TouchableOpacity
            onPress={() => {
              setSelected(spiceness.id);
              setIsOpen(false);
            }}
            key={spiceness.id}
            style={{
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 50,
            }}>
            <Image
              source={spiceness.icon}
              style={{width: 40, aspectRatio: 1}}
            />
            <Text>{spiceness.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SpicenessSelector;

const styles = StyleSheet.create({});
