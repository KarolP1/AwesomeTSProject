import {ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import MenuButtonItem from './MenuButtonItem';
import {SharedValue} from 'react-native-reanimated';
import {useAppDispatch} from '../../redux/hooks';
import {logout} from '../../utils/localStorage';
import {cleanUpLogin, setAuthState} from '../../redux/Auth/loginReducer';

const MenuButtonsList = ({
  isMenuOpen,
  setIsMenuOpen,
  offset,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  offset: SharedValue<number>;
}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {}, [isMenuOpen]);
  const menuItems: {
    title: string;
    onPress: () => void;
    icon: ImageSourcePropType;
  }[] = [
    {
      title: 'Profile',
      onPress: () => {
        console.log('Pressed item 1');
        setIsMenuOpen(!isMenuOpen);
      },
      icon: require('../../assets/utilityIcons/menuIcons/itemIcons/profile.png'),
    },
    {
      title: 'Notifications',
      onPress: () => {
        console.log('Pressed Notifications');
        setIsMenuOpen(!isMenuOpen);
      },
      icon: require('../../assets/utilityIcons/menuIcons/itemIcons/notification.png'),
    },
    {
      title: 'Wallet',
      onPress: () => {
        console.log('Pressed Wallet');
        setIsMenuOpen(!isMenuOpen);
      },
      icon: require('../../assets/utilityIcons/menuIcons/itemIcons/wallet.png'),
    },
    {
      title: 'Cart',
      onPress: () => {
        console.log('Pressed Cart');
        setIsMenuOpen(!isMenuOpen);
      },
      icon: require('../../assets/utilityIcons/menuIcons/itemIcons/cart.png'),
    },
    {
      title: 'Favourites',
      onPress: () => {
        console.log('Pressed Favourites');
        setIsMenuOpen(!isMenuOpen);
      },
      icon: require('../../assets/utilityIcons/menuIcons/itemIcons/favourites.png'),
    },
    {
      title: 'Country',
      onPress: () => {
        console.log('Pressed Country');
        setIsMenuOpen(!isMenuOpen);
      },
      icon: require('../../assets/utilityIcons/menuIcons/itemIcons/country.png'),
    },
    {
      title: 'Language',
      onPress: () => {
        console.log('Pressed Language');
        setIsMenuOpen(!isMenuOpen);
      },
      icon: require('../../assets/utilityIcons/menuIcons/itemIcons/language.png'),
    },
    {
      title: 'Contact',
      onPress: () => {
        console.log('Pressed Contact');
        setIsMenuOpen(!isMenuOpen);
      },
      icon: require('../../assets/utilityIcons/menuIcons/itemIcons/contact.png'),
    },
    {
      title: 'FAQ',
      onPress: () => {
        console.log('Pressed FAQ');
        setIsMenuOpen(!isMenuOpen);
      },
      icon: require('../../assets/utilityIcons/menuIcons/itemIcons/faq.png'),
    },
    {
      title: 'Logout',
      onPress: () => {
        logout();
        dispatch(cleanUpLogin());
        dispatch(setAuthState(false));
        setIsMenuOpen(!isMenuOpen);
      },
      icon: require('../../assets/utilityIcons/menuIcons/itemIcons/logout.png'),
    },
  ];

  return (
    <>
      {menuItems.map((menuItem, index) => (
        <MenuButtonItem
          isMenuOpen={isMenuOpen}
          key={index}
          name={menuItem.title}
          onPress={menuItem.onPress}
          icon={menuItem.icon}
          offset={(index * 10) / 2}
        />
      ))}
    </>
  );
};

export default MenuButtonsList;

const styles = StyleSheet.create({});
