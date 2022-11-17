import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import DropShadow from 'react-native-drop-shadow';
import {IMenuItem} from '../../redux/Profile/types';
import {WEBCONST} from '../../constants/webConstants';
import {useNavigation, useRoute} from '@react-navigation/native';
import {IMenuItemAddModalNavigation} from '../../navigation/order/types';

const SingleMenuList = ({
  menuItem,
  establishmentId,
}: {
  menuItem: IMenuItem;
  establishmentId: string;
}) => {
  const navigation = useNavigation<IMenuItemAddModalNavigation>();
  const {width} = useWindowDimensions();
  return (
    <DropShadow
      key={menuItem._id}
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,

        elevation: 17,
        width: width / 1.75,
        marginHorizontal: 10,
        backgroundColor: '#ffffff03',

        borderRadius: 5,
      }}>
      <View
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          padding: 10,
          zIndex: 10,
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          style={{padding: 5}}
          onPress={() => {
            navigation.navigate('MenuItemAddModal', {
              menuItem: menuItem,
              establishmentId,
            });
          }}>
          <Image
            style={{width: 25, height: 25}}
            source={require('../../assets/utilityIcons/add.png')}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: '100%',
          width: '100%',
          padding: 10,
          paddingVertical: 30,
          paddingHorizontal: 40,
          margin: 0,
        }}>
        <DropShadow
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 10,
              height: 10,
            },
            shadowOpacity: 0.39,
            shadowRadius: 8.3,

            elevation: 13,
          }}>
          <Image
            style={{
              height: 100,
              width: '80%',
              aspectRatio: 1,
              resizeMode: 'contain',
              borderRadius: width,
              alignSelf: 'center',
              backgroundColor: '#ffffff09',
            }}
            source={
              menuItem.image
                ? {
                    uri: `${WEBCONST().APIURL}${menuItem.image?.path}`,
                  }
                : require('../../assets/BX.png')
            }
          />
        </DropShadow>
        <Text style={[styles.textStyle, {fontSize: 18}]}>
          {menuItem.dishName}
        </Text>
        <Text
          style={[
            styles.textStyle,
            {
              fontSize: 14,
              fontFamily: 'Handlee-Regular',
              maxHeight: 40,
            },
          ]}>
          {menuItem.dishDescription}
        </Text>
        <Text
          style={[
            styles.textStyle,
            {
              fontSize: 18,
              fontWeight: '900',
            },
          ]}>
          {menuItem.currency}
          {menuItem.price}
        </Text>
      </View>
    </DropShadow>
  );
};

export default SingleMenuList;

const styles = StyleSheet.create({
  textStyle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Damion',
    textTransform: 'capitalize',
  },
});
