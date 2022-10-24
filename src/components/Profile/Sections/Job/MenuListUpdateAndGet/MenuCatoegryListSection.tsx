import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IIsCategoryVisible} from '../../../../../redux/Profile/establishmentMenus/types';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {allCategoriesOrder} from '../../../../categorySelector/allCategories';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SimpleSection from '../../infoScetion/SimpleSection';
import DropShadow from 'react-native-drop-shadow';
import InsetShadow from 'react-native-inset-shadow';
import _ from 'lodash';
import EditButton from '../../../../buttons/EditButton';
import SwitchButton from '../../../../buttons/SwitchButton';
import {EditEstablishmentMenuCategories} from '../../../../../redux/Order/Establishment.menycategory.thunk';

const MenuCatoegryListSection = ({selected}: {selected: string}) => {
  const {data} = useAppSelector(state => state.MyEstabishmentMenus);

  const dispatch = useAppDispatch();
  const [selectedMenuCategories, setSelectedMenuCategories] = useState<
    IIsCategoryVisible[] | null
  >(null);
  const allCategories = allCategoriesOrder();
  useEffect(() => {
    if (data) {
      const selectedMenu = data.filter(menu => menu._id === selected);
      setSelectedMenuCategories(selectedMenu[0].categoryVisibility);
    }
  }, [data]);
  const isCategoryDisabled = (categoryName: string) => {
    const categoryCheckted = selectedMenuCategories?.filter(
      category => category.categoryName === categoryName,
    )[0];
    return categoryCheckted?.isVisible;
  };

  const [isEditModeEnabled, setIsEditModeEnabled] = useState<boolean>(false);

  const changeVisiblity = (categoryName: string) => {
    if (isEditModeEnabled) {
      const categoryChanged = selectedMenuCategories?.map(category =>
        category.categoryName !== categoryName
          ? category
          : {...category, isVisible: !category.isVisible},
      );
      if (categoryChanged) setSelectedMenuCategories(categoryChanged);
    }
  };

  const [categoryVisibleSection, setCategoryVisibleSection] =
    useState<boolean>(true);

  const changeCategoryVisibility = () => {
    const newCategoriesVisible = selectedMenuCategories?.map(section => {
      section.isVisible = categoryVisibleSection;
      return section;
    });
    if (newCategoriesVisible) {
      setCategoryVisibleSection(!categoryVisibleSection);
      setSelectedMenuCategories(newCategoriesVisible);
    }
  };

  useEffect(() => {
    const findAnyTrue = selectedMenuCategories?.some(
      category => category.isVisible === false,
    );
    if (findAnyTrue === true) {
      setCategoryVisibleSection(true);
    }

    const findAnyfalse = selectedMenuCategories?.some(
      category => category.isVisible === true,
    );
    if (findAnyfalse === true) {
      setCategoryVisibleSection(false);
    }
  }, [selectedMenuCategories]);

  useEffect(() => {
    if (data && selectedMenuCategories) {
      const menuId = data[0]._id;
      const timeoutId = setTimeout(() => {
        dispatch(
          EditEstablishmentMenuCategories({
            categoryVisibility: selectedMenuCategories,
            menuId,
            isOurMenuSubmenuVisible: categoryVisibleSection,
          }),
        );
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedMenuCategories, categoryVisibleSection]);

  return (
    <SimpleSection
      title={'Categories'}
      isEditModeEnabled={isEditModeEnabled}
      Button={() => (
        <EditButton
          isEditModeEnabled={isEditModeEnabled}
          setIsEditModeEnabled={setIsEditModeEnabled}
        />
      )}
      ExtraButton={() =>
        isEditModeEnabled ? (
          <SwitchButton
            categoryVisibleSection={categoryVisibleSection}
            setCategoryVisibleSection={setCategoryVisibleSection}
            onPress={() => changeCategoryVisibility()}
          />
        ) : null
      }>
      <ScrollView horizontal>
        {allCategories.map(category =>
          isCategoryDisabled(category.cagetoryName) ? (
            <TouchableOpacity
              activeOpacity={!isEditModeEnabled ? 1 : 0}
              key={category.index}
              //   disabled={isEditModeEnabled}
              onPress={() => {
                changeVisiblity(category.cagetoryName);
              }}>
              <DropShadow
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: -2,
                    height: 4,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 15,
                  elevation: 1,
                  borderRadius: 10,
                  padding: 10,
                  overflow: 'hidden',
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  marginHorizontal: 5,
                  position: 'relative',
                  height: 100,
                  width: 100,
                }}>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 100,
                  }}
                  source={require('../../../../../assets/utilityIcons/visible.png')}
                />
                <Image
                  style={{width: 40, height: 40, alignSelf: 'center'}}
                  source={category.categoryIcon}
                />
                <Text style={{fontSize: 12, marginTop: 10}}>
                  {category.cagetoryName}
                </Text>
              </DropShadow>
            </TouchableOpacity>
          ) : (
            <InsetShadow
              key={category.index}
              containerStyle={{
                width: 100,
                height: 100,
                shadowColor: 'rgba(0,0,0,.1)',
                shadowOffset: {
                  width: -2,
                  height: 4,
                },
                shadowOpacity: 1,
                shadowRadius: 15,
                elevation: 1,
                borderRadius: 10,
                padding: 10,
                overflow: 'hidden',
                aspectRatio: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.01)',
                marginHorizontal: 5,
                position: 'relative',
              }}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  zIndex: 100,
                }}
                source={require('../../../../../assets/utilityIcons/notVisible.png')}
              />
              <TouchableOpacity
                activeOpacity={!isEditModeEnabled ? 1 : 0}
                // disabled={isEditModeEnabled}
                key={category.index}
                onPress={() => {
                  changeVisiblity(category.cagetoryName);
                }}>
                <Image
                  style={{width: 40, height: 40, alignSelf: 'center'}}
                  source={category.categoryIcon}
                />
                <Text style={{fontSize: 12, marginTop: 10}}>
                  {category.cagetoryName}
                </Text>
              </TouchableOpacity>
            </InsetShadow>
          ),
        )}
      </ScrollView>
    </SimpleSection>
  );
};

export default MenuCatoegryListSection;

const styles = StyleSheet.create({});
