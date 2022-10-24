import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SimpleSection from '../../infoScetion/SimpleSection';
import {useAppSelector} from '../../../../../redux/hooks';

const MenuItemsListSection = ({selectedMenuId}: {selectedMenuId: string}) => {
  const {data} = useAppSelector(state => state.MyEstabishmentMenus);
  const filteredMenu = data?.filter(menu => menu._id === selectedMenuId);
  return (
    <SimpleSection title={'Menu items'}>
      <View></View>
      <Text>{JSON.stringify(filteredMenu)}</Text>
      <View style={{height: 50}}></View>
    </SimpleSection>
  );
};

export default MenuItemsListSection;

const styles = StyleSheet.create({});
