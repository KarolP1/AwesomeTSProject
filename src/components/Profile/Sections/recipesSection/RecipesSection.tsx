import {Image, StyleSheet, Text, View} from 'react-native';
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
import SimpleSection from '../infoScetion/SimpleSection';
import {TouchableOpacity} from 'react-native-gesture-handler';

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

  const [isEditModeEnabled, setIsEditModeEnabled] = useState<boolean>(false);

  const [isEditModeEnabledBest, setIsEditModeEnabledBest] =
    useState<boolean>(false);

  useEffect(() => {
    dispatch(getMyRecipes({category: dishesType?.cagetoryName}));
  }, [dishesType]);

  return (
    <View style={{width: '100%', marginTop: 10}}>
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
          <>
            <SimpleSection
              title={'Your best recipes'}
              isEditModeEnabled={isEditModeEnabledBest}
              Button={() =>
                !isEditModeEnabledBest ? (
                  <TouchableOpacity
                    onPress={() => {
                      setIsEditModeEnabledBest(!isEditModeEnabledBest);
                      setIsEditModeEnabled(false);
                    }}>
                    <Image
                      style={{height: 20, width: 20}}
                      source={require('../../../../assets/utilityIcons/edit.png')}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setIsEditModeEnabledBest(!isEditModeEnabledBest);
                    }}>
                    <Image
                      style={{
                        height: 20,
                        width: 20,
                        transform: [{rotate: '45deg'}],
                      }}
                      source={require('../../../../assets/utilityIcons/add.png')}
                    />
                  </TouchableOpacity>
                )
              }>
              <View style={{height: 400}}>
                <RecipesLists
                  isEditModeEnabled={isEditModeEnabledBest}
                  recipes={recipes}
                  title={null}
                />
              </View>
            </SimpleSection>
            <SimpleSection
              title={'Your recipes'}
              isEditModeEnabled={isEditModeEnabled}
              Button={() =>
                !isEditModeEnabled ? (
                  <TouchableOpacity
                    onPress={() => {
                      setIsEditModeEnabled(!isEditModeEnabled);
                      setIsEditModeEnabledBest(false);
                    }}>
                    <Image
                      style={{height: 20, width: 20}}
                      source={require('../../../../assets/utilityIcons/edit.png')}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setIsEditModeEnabled(!isEditModeEnabled);
                    }}>
                    <Image
                      style={{
                        height: 20,
                        width: 20,
                        transform: [{rotate: '45deg'}],
                      }}
                      source={require('../../../../assets/utilityIcons/add.png')}
                    />
                  </TouchableOpacity>
                )
              }>
              <View style={{height: 400}}>
                <RecipesLists recipes={recipes} title={null} />
              </View>
            </SimpleSection>
          </>
        )}
      </View>
    </View>
  );
};

export default RecipesSection;

const styles = StyleSheet.create({});
