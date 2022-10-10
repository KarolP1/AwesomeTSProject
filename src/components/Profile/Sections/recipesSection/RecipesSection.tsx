import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IGetProfileInfo} from '../../../../redux/Profile/types';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import CategoryRecipesSelector from '../../../categorySelector';
import {
  allCategoriesRecipe,
  category,
} from '../../../categorySelector/allCategories';
import {useDispatch} from 'react-redux';
import {getMyRecipes} from '../../../../redux/recipes/myRecipes/myRecipes.thunk';
import Spinner from 'react-native-spinkit';
import RecipesLists from '../../../recipes/recipesLists';
import {IRecipe} from '../../../../redux/recipes/types';

const RecipesSection = ({}: {}) => {
  const {isLoading, data} = useAppSelector(state => state.myRecipes);
  const [recipes, setRecipes] = useState<IRecipe[]>(data ? data : []);

  useEffect(() => {
    if (data) setRecipes(data);
  }, [data]);

  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<
    0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null
  >(null);
  const [dishesType, setDishesType] = useState<category>();

  useEffect(() => {
    const allDishesType = allCategoriesRecipe();
    const selectedType = allDishesType.find(
      element => element.index === selected,
    );

    if (selectedType) setDishesType(selectedType);
    if (selected === null) {
      console.log('running dispatch');
      dispatch(getMyRecipes());
    }
  }, [selected]);

  useEffect(() => {
    dispatch(getMyRecipes({category: dishesType?.cagetoryName}));
  }, [dishesType]);

  return (
    <View style={{marginTop: 10}}>
      <CategoryRecipesSelector
        size={70}
        selected={selected}
        setSelected={setSelected}
      />
      <View style={{flex: 1}}>
        {isLoading ? (
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Spinner
              // style={styles.spinner}
              isVisible={isLoading}
              size={100}
              type={'ThreeBounce'}
              color={'#EA3651'}
            />
          </View>
        ) : (
          <View style={{maxHeight: 450}}>
            <RecipesLists recipes={recipes} title={'My recipes'} />
          </View>
        )}
      </View>
      <Text>{JSON.stringify(recipes)}</Text>
    </View>
  );
};

export default RecipesSection;

const styles = StyleSheet.create({});
