import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from 'react';
import {IMenuItem} from '../../../../../redux/Profile/establishmentMenus/types';

const SingleMenuItem = ({menuItem}: {menuItem: IMenuItem}) => {
  const {width} = useWindowDimensions();
  const counter = menuItem?.counter;
  return (
    <View
      key={menuItem._id}
      style={{
        width: width / 1.5,
        paddingVertical: 20,
        paddingHorizontal: 10,
      }}>
      <View
        style={{
          width: '100%',
          aspectRatio: 2,
          backgroundColor: '#646464',
        }}>
        {counter && (
          <View style={{width: '30%', marginLeft: 10, marginTop: 10}}>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: 2,
                backgroundColor: 'rgba(255,255,255,0.2)',
                flexDirection: 'row',
                borderRadius: 15,
                paddingVertical: 2,
                paddingHorizontal: 10,
              }}>
              <Image
                style={{width: 15, height: 15}}
                source={require('../../../../../assets/utilityIcons/click.png')}
              />
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Handlee-Regular',
                  fontSize: 12,
                }}>
                {counter?.numberOfClicks}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: 2,
                backgroundColor: 'rgba(255,255,255,0.2)',
                flexDirection: 'row',
                borderRadius: 15,
                paddingVertical: 2,
                paddingHorizontal: 10,
              }}>
              <Image
                style={{width: 15, height: 15}}
                source={require('../../../../../assets/utilityIcons/heart.png')}
              />
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Handlee-Regular',
                  fontSize: 12,
                }}>
                {counter?.numberOfLikes}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: 2,
                backgroundColor: 'rgba(255,255,255,0.2)',
                flexDirection: 'row',
                borderRadius: 15,
                paddingVertical: 2,
                paddingHorizontal: 10,
              }}>
              <Image
                style={{width: 15, height: 15}}
                source={require('../../../../../assets/utilityIcons/share.png')}
              />
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Handlee-Regular',
                  fontSize: 12,
                }}>
                {counter?.numberOfShares}
              </Text>
            </View>
          </View>
        )}
      </View>
      <Text
        style={{
          fontFamily: 'Damion',
          textTransform: 'capitalize',
          fontSize: 14,
        }}>
        {menuItem.dishName}
      </Text>
      <Text
        style={{
          fontFamily: 'Handlee-Regular',
          textTransform: 'capitalize',
          fontSize: 14,
        }}>
        {menuItem.dishDescription}
      </Text>
      <Text
        style={{
          fontFamily: 'Handlee-Regular',
          textTransform: 'capitalize',
          fontSize: 14,
        }}>
        {menuItem.currency} {menuItem.price}
      </Text>
    </View>
  );
};

export default SingleMenuItem;

const styles = StyleSheet.create({});
