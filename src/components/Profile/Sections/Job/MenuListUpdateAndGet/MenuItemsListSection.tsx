import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import SimpleSection from '../../infoScetion/SimpleSection';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {ScrollView} from 'react-native-gesture-handler';
import {IMenuItem} from '../../../../../redux/Profile/establishmentMenus/types';
import SingleMenuItem from './SingleMenuItem';
import EditButton from '../../../../buttons/EditButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ProfileNavigationAddMenuItems} from '../../../../../navigation/Profile/ProfileNavigator.types';
import {getMyEstabishmentMenus} from '../../../../../redux/Profile/establishmentMenus/EstablishmentMenu.thunk';
import {DeleteMyEstabishmentMenuItem} from '../../../../../redux/Profile/establishmentMenus/establishmentMenuItem/addEstablishmentMenuItem';
import {WEBCONST} from '../../../../../constants/webConstants';

const MenuItemsListSection = ({selectedMenuId}: {selectedMenuId: string}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ProfileNavigationAddMenuItems>();
  const {data} = useAppSelector(state => state.MyEstabishmentMenus);
  const filteredMenu =
    data && data?.filter(menu => menu._id === selectedMenuId)[0];

  const [isEditModeEnabled, setIsEditModeEnabled] = useState(false);

  return (
    <SimpleSection
      isEditModeEnabled={isEditModeEnabled}
      ExtraButton={() =>
        isEditModeEnabled ? (
          <TouchableOpacity
            style={{marginRight: 20}}
            onPress={() => {
              navigation.navigate('AddMenuItem', {menuId: selectedMenuId});
            }}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../../../../../assets/utilityIcons/add.png')}
            />
          </TouchableOpacity>
        ) : null
      }
      title={'Menu items'}
      Button={() => EditButton({isEditModeEnabled, setIsEditModeEnabled})}>
      <ScrollView horizontal>
        {filteredMenu &&
          filteredMenu.menuItems.map(menuItem => {
            return (
              <View style={{position: 'relative'}} key={menuItem._id}>
                <SingleMenuItem menuItem={menuItem} key={menuItem._id} />
                {isEditModeEnabled && (
                  <View style={{position: 'absolute', right: 20, top: 30}}>
                    <TouchableOpacity
                      style={{width: 20, height: 20, marginBottom: 10}}
                      disabled={!isEditModeEnabled}
                      onPress={() => {
                        navigation.navigate('EditMenuItem', {
                          menuId: selectedMenuId,
                          item: menuItem,
                        });
                      }}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../../../../assets/utilityIcons/editC.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{width: 20, height: 20, marginBottom: 10}}
                      disabled={!isEditModeEnabled}
                      onPress={() => {
                        dispatch(
                          DeleteMyEstabishmentMenuItem({
                            menuID: filteredMenu._id,
                            menuItem: menuItem,
                          }),
                        );
                      }}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../../../../assets/utilityIcons/deleteC.png')}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}
      </ScrollView>
      <View style={{height: 50}}></View>
    </SimpleSection>
  );
};

export default MenuItemsListSection;
