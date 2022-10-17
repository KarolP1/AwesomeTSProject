import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InsetShadow from 'react-native-inset-shadow';
import {Shadow} from 'react-native-shadow-2';
import {TouchableOpacity} from 'react-native-gesture-handler';

const OnOfButton = ({
  title,
  selected,
  setSelected,
}: {
  title: string;
  selected: boolean;
  setSelected: () => void;
}) => {
  return (
    <View style={{flex: 1, height: '100%', width: '100%'}}>
      {!selected ? (
        <TouchableOpacity onPress={setSelected} style={styles.buttonStyle}>
          <Shadow
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 40,
                height: 4,
              },
              shadowOpacity: 0.17,
              shadowRadius: 5.65,

              elevation: 6,
              flex: 1,
              justifyContent: 'center',
              borderRadius: 5,
              paddingHorizontal: 60,
            }}>
            <Text
              style={{
                alignSelf: 'stretch',

                color: '#fff',
                fontWeight: 'bold',
                textTransform: 'capitalize',
                fontSize: 10,
              }}>
              {title}
            </Text>
          </Shadow>
        </TouchableOpacity>
      ) : (
        <InsetShadow
          containerStyle={styles.shadow}
          shadowRadius={10}
          shadowOffset={10}
          elevation={100}
          shadowOpacity={0.5}
          color="rgba(128,128,128,1)">
          <TouchableOpacity onPress={setSelected} style={styles.buttonStyle}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textTransform: 'capitalize',
                fontSize: 10,
              }}>
              {title}
            </Text>
          </TouchableOpacity>
        </InsetShadow>
      )}
    </View>
  );
};

export default OnOfButton;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    borderRadius: 5,
  },
  buttonStyle: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  shadowouter: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    marginHorizontal: 10,

    elevation: 6,
    height: '100%',
    width: '100%',
  },
});
