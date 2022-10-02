import {Text, View} from 'react-native';
import React, {useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import RecipesLists from '../../../components/recipes/recipesLists';
import {FindScreenProps} from '../../../navigation/types';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {
  getAllRecipes,
  getAllRecipesByCategory,
  getAllRecipesByTag,
} from '../../../redux/recipes/recipesThunks';
import {useFocusEffect} from '@react-navigation/native';
import {instance, refreshTokenInterveptor} from '../../../redux/interceptors';
import CategoryRecipesSelector from '../../../components/categorySelector';
import {allCategoriesRecipe} from '../../../components/categorySelector/allCategories';
import Spinner from 'react-native-spinkit';
import CuisineSearchbar from '../../../components/categorySelector/cuisineSearchbar';

const RecipesFind = ({route}: FindScreenProps) => {
  const tag = route.params?.recipesTag;
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<
    0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null
  >(null);
  const [cuisine, setCuisine] = useState<string | null>(null);
  const [cuisineCode, setCuisineCode] = useState<string | null>(null);

  refreshTokenInterveptor(dispatch, instance);
  const allCateg = allCategoriesRecipe();
  const recipesStatus = useAppSelector(state => state.recipes.isLoading);

  useFocusEffect(
    React.useCallback(() => {
      if (cuisine) {
        dispatch(getAllRecipesByCategory(cuisine));
      }
      if (selected === null) {
        const run = async () => {
          await dispatch(getAllRecipes());
          if (tag) await dispatch(getAllRecipesByTag(tag));
        };
        run();
      } else {
        if (tag) dispatch(getAllRecipesByTag(tag));
        dispatch(getAllRecipesByCategory(allCateg[selected].cagetoryName));
      }
    }, [route, selected, cuisine]),
  );

  const allRecipes = useAppSelector(state => state.recipes.data);
  return (
    <LoggedInBackground>
      <CuisineSearchbar
        setCuisine={setCuisine}
        cuisine={cuisine}
        setCuisineCode={setCuisineCode}
      />
      <CategoryRecipesSelector selected={selected} setSelected={setSelected} />
      {!recipesStatus ? (
        <>
          {tag && (
            <View style={{height: 400}}>
              <RecipesLists tag={tag} recipes={allRecipes} />
            </View>
          )}
          <View style={{height: 400}}>
            <RecipesLists recipes={allRecipes} />
          </View>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Spinner
            // style={styles.spinner}
            isVisible={true}
            size={100}
            type={'ThreeBounce'}
            color={'#EA3651'}
          />
        </View>
      )}
    </LoggedInBackground>
  );
};

export default RecipesFind;
