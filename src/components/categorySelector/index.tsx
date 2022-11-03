import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {SetStateAction, useState} from 'react';
import {allCategoriesRecipe, category} from './allCategories';
import SingleCategory from './SingleCategory';
import DropShadow from 'react-native-drop-shadow';
import InsetShadow from 'react-native-inset-shadow';

const CategoryRecipesSelector = ({
  selected,
  setSelected,
  size,
  categoriesProp,
}: {
  selected: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null;
  setSelected: React.Dispatch<
    SetStateAction<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null>
  >;
  size?: number;
  categoriesProp: category[];
}) => {
  const categories = categoriesProp;
  return (
    <ScrollView horizontal style={{maxHeight: 110}}>
      {categories?.map(category => (
        <TouchableOpacity
          activeOpacity={1}
          key={category.index}
          onPress={() => {
            if (category.index === selected) setSelected(null);
            else setSelected(category.index);
          }}>
          {selected !== category.index ? (
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
                style={{width: 40, height: 40, alignSelf: 'center'}}
                source={category.categoryIcon}
              />
              <Text style={{fontSize: 12, marginTop: 10}}>
                {category.cagetoryName}
              </Text>
            </DropShadow>
          ) : (
            <>
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
                  style={{width: 40, height: 40, alignSelf: 'center'}}
                  source={category.categoryIcon}
                />
                <Text style={{fontSize: 12, marginTop: 10}}>
                  {category.cagetoryName}
                </Text>
              </InsetShadow>
            </>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategoryRecipesSelector;

const styles = StyleSheet.create({});
