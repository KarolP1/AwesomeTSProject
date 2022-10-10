import {StyleSheet, Text, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {allCategoriesRecipe} from './allCategories';
import SingleCategory from './SingleCategory';

const CategoryRecipesSelector = ({
  selected,
  setSelected,
  size,
}: {
  selected: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null;
  setSelected: React.Dispatch<
    React.SetStateAction<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null>
  >;
  size?: number;
}) => {
  const categories = allCategoriesRecipe();
  return (
    <ScrollView
      horizontal
      contentContainerStyle={{height: size ? size : 100}}
      style={{maxHeight: 100}}>
      {categories.map(category => (
        <SingleCategory
          key={category.index}
          singleCategory={category}
          setSelected={setSelected}
          isSelected={selected === category.index}
        />
      ))}
    </ScrollView>
  );
};

export default CategoryRecipesSelector;

const styles = StyleSheet.create({});
