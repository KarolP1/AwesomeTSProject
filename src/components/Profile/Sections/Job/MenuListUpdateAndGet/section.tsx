import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {IEstablishment} from '../../../../../redux/Profile/types';
import SimpleSection from '../../infoScetion/SimpleSection';
import {ScrollView} from 'react-native-gesture-handler';
import MenuTitles from './MenuTitles.section';
import MenuItemsListSection from './MenuItemsListSection';
import MenuCatoegryListSection from './MenuCatoegryListSection';

const MenuListUpdateAndGet = ({
  establishment,
}: {
  establishment: IEstablishment;
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <>
      <MenuTitles
        selected={selected}
        setSelected={setSelected}
        establishment={establishment}
      />

      {selected && <MenuCatoegryListSection selected={selected} />}
      {selected && <MenuItemsListSection selectedMenuId={selected} />}
    </>
  );
};

export default MenuListUpdateAndGet;

const styles = StyleSheet.create({});
