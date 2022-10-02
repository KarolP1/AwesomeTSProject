import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {getTokens} from '../../../redux/Auth/loginReducer';
import AddImage from '../../../components/image/addImage';
import {ImagePickerResponse} from 'react-native-image-picker';
import {TextInputCustom} from '../../../components/TextInputs';
import TextInputRecipe from '../../../components/TextInputs/TextInputRecipe';
import CuisineSearchbar from '../../../components/categorySelector/cuisineSearchbar';
import OnOfButton from '../../../components/recipes/OnOfButton';
import CategoryRecipesSelector from '../../../components/categorySelector';
import SpicenessSelector from '../../../components/TextInputs/SpicenessSelector';
import ManualController from './ManualController';
import IngredientController from './IngredientController';
import TagController from '../../../components/recipes/TagController';
import AddRecipe, {
  cleanUpAddRecipe,
  getAddRecipeError,
} from '../../../redux/recipes/addRecipe/addRecipe';
import {addRecipeThunk as addRecipe} from '../../../redux/recipes/addRecipe/addRecipe.thunk';
import {allCategoriesRecipe} from '../../../components/categorySelector/allCategories';
import {instance, refreshTokenInterveptor} from '../../../redux/interceptors';
import AdvancementButton from '../../../components/recipes/AdvancementButton';
import {useNavigation} from '@react-navigation/native';
import {RecipesHomePageScreenProp} from '../../../navigation/types';

export interface IIngredientList {
  _id?: string;
  qtt?: string;
  unit: string;
  name: string;
}
export interface IManualList {
  _id?: string | null;
  stepNumber?: string;
  description?: string;
  imageUrl?: ImagePickerResponse;
}
export interface IRecipeAdd {
  title: string;
  description: string;
  cuisineCode: string | null;
  isKosher: boolean;
  isVegan: boolean;
  isHalal: boolean;
  dishesType: string;
  spiceness: 'extra hot' | 'Hot' | 'Mild' | 'normal';
  ingredientsList: IIngredientList[];
  isEstablishment: boolean;
  advancement: 1 | 2 | 3 | 4 | 5;
  prepTime: string;
  cookTime: string;
  serves: string;
  manualList: IManualList[];
  tipTitle: string;
  tipDescription: string;
  tipIngredientsList: IIngredientList[];
  tipManualList: IManualList[];
  tags: string[];
}
const initialState: IRecipeAdd = {
  title: 'test',
  description: 'desc test',
  cuisineCode: 'pl',
  isKosher: false,
  isVegan: false,
  isHalal: false,
  dishesType: 'Bakeries',
  spiceness: 'normal',
  ingredientsList: [
    {name: 'sugar', unit: 'g', qtt: '1'},
    {name: 'sugar', unit: 'g', qtt: '1'},
    {name: 'sugar', unit: 'g', qtt: '1'},
    {name: 'sugar', unit: 'g', qtt: '1'},
    {name: 'sugar', unit: 'g', qtt: '1'},
    {name: 'sugar', unit: 'g', qtt: '1'},
    {name: 'sugar', unit: 'g', qtt: '1'},
    {name: 'sugar', unit: 'g', qtt: '1'},
  ],
  isEstablishment: false,
  advancement: 1,
  prepTime: '00:10',
  cookTime: '00:30',
  serves: '4',
  manualList: [
    {description: 'asdasda', stepNumber: '1'},
    {description: 'asdasda', stepNumber: '1'},
    {description: 'asdasda', stepNumber: '1'},
    {description: 'asdasda', stepNumber: '1'},
    {description: 'asdasda', stepNumber: '1'},
    {description: 'asdasda', stepNumber: '1'},
  ],
  tipTitle: 'tip',
  tipDescription: 'desc tip',
  tipIngredientsList: [
    {name: 'sugar', unit: 'g', qtt: '1'},
    {name: 'sugar', unit: 'g', qtt: '1'},
    {name: 'sugar', unit: 'g', qtt: '1'},
    {name: 'sugar', unit: 'g', qtt: '1'},
    {name: 'sugar', unit: 'g', qtt: '1'},
    {name: 'sugar', unit: 'g', qtt: '1'},
    {name: 'sugar', unit: 'g', qtt: '1'},
    {name: 'sugar', unit: 'g', qtt: '1'},
  ],
  tipManualList: [
    {description: 'asdasda', stepNumber: '1'},
    {description: 'asdasda', stepNumber: '1'},
    {description: 'asdasda', stepNumber: '1'},
    {description: 'asdasda', stepNumber: '1'},
    {description: 'asdasda', stepNumber: '1'},
    {description: 'asdasda', stepNumber: '1'},
  ],
  tags: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
};

const Recipesadd = () => {
  const dispatch = useAppDispatch();
  const token = getTokens();
  const navigation = useNavigation<RecipesHomePageScreenProp>();
  refreshTokenInterveptor(dispatch, instance);

  const [recipeAdd, setRecipeAdd] = useState<IRecipeAdd>(initialState);
  //#region state for manualList
  const [image, setImage] = useState<ImagePickerResponse | null>(null);
  const [selected, setSelected] = useState<
    0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null
  >(null);
  const [cuisine, setCuisine] = useState<string | null>(null);
  const [cuisineCode, setCuisineCode] = useState<string | null>(null);
  const [isEstablishment, setIsEstablishment] = useState<boolean>(false);
  const [spiceness, setSpiceness] = useState<
    'normal' | 'extra hot' | 'Hot' | 'Mild'
  >('normal');
  const [advancement, setAdvancement] = useState<1 | 2 | 3 | 4 | 5>(1);
  /** ingredients and manual */

  const [manualList, setManualList] = useState<IManualList[]>(
    initialState.manualList,
  );
  const [ingredientsList, setIngredientsList] = useState<IIngredientList[]>(
    initialState.ingredientsList,
  );
  const [tipManualList, setTipManualList] = useState<IManualList[]>(
    initialState.tipManualList,
  );
  const [tipIngredientsList, setTipIngredientsList] = useState<
    IIngredientList[]
  >(initialState.tipIngredientsList);
  const [tags, setTags] = useState<string[]>([]);

  //git
  //#endregion

  //#region effects
  useEffect(() => {
    setRecipeAdd({
      ...recipeAdd,
      advancement,
    });
  }, [advancement]);
  useEffect(() => {
    setRecipeAdd({
      ...recipeAdd,
      spiceness,
    });
  }, [spiceness]);

  useEffect(() => {
    if (cuisineCode) setRecipeAdd({...recipeAdd, cuisineCode: cuisineCode});
  }, [cuisineCode]);

  useEffect(() => {
    setRecipeAdd({
      ...recipeAdd,
      manualList: manualList,
      ingredientsList,
      tipManualList,
      tipIngredientsList,
      tags,
    });
  }, [manualList, ingredientsList, tipManualList, tipIngredientsList, tags]);
  useEffect(() => {
    const allDishesType = allCategoriesRecipe();
    const selectedType = allDishesType.find(
      element => element.index === selected,
    );
    if (selectedType)
      setRecipeAdd({...recipeAdd, dishesType: selectedType.cagetoryName});
  }, [selected]);

  useEffect(() => {
    setRecipeAdd({...recipeAdd, isEstablishment});
  }, [isEstablishment]);
  //#endregion
  const recipeAddSuccess = useAppSelector(state => state.addRecipe.succes);

  useEffect(() => {
    if (recipeAddSuccess === true) {
      navigation.navigate('My Recipes');
      dispatch(cleanUpAddRecipe());
    }
  }, [recipeAddSuccess]);

  return (
    <LoggedInBackground>
      <View style={{flex: 1, flexGrow: 1, width: '100%', alignItems: 'center'}}>
        <AddImage image={image} setImage={setImage} />
        {/* is establishment */}
        {/* //TODO: if in profile not establishment dont allowa as establishment */}
        <View style={{flexDirection: 'row', width: '100%', marginVertical: 10}}>
          <OnOfButton
            isOpen={isEstablishment}
            name="Establishment"
            setIsOpen={() => setIsEstablishment(true)}
          />
          <OnOfButton
            isOpen={!isEstablishment}
            name="User"
            setIsOpen={() => setIsEstablishment(false)}
          />
        </View>
        <Text style={styles.TextSimple}>Title:</Text>
        <TextInputRecipe
          name="title"
          placeholder="Title"
          value={recipeAdd?.title}
          onChange={setRecipeAdd}
          state={recipeAdd}
        />
        <Text style={styles.TextSimple}>Description:</Text>
        <TextInputRecipe
          name="description"
          placeholder="Description"
          value={recipeAdd?.description}
          onChange={setRecipeAdd}
          state={recipeAdd}
        />
        <Text style={styles.TextSimple}>Advancement:</Text>
        <AdvancementButton
          selected={advancement}
          setSelected={setAdvancement}
        />
        <Text style={styles.TextSimple}>Cuisine:</Text>
        <CuisineSearchbar
          cuisine={cuisine}
          setCuisine={setCuisine}
          setCuisineCode={setCuisineCode}
        />
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <OnOfButton
            isOpen={recipeAdd?.isHalal}
            name="isHalal"
            setIsOpen={() =>
              setRecipeAdd({...recipeAdd, isHalal: !recipeAdd.isHalal})
            }
          />
          <OnOfButton
            isOpen={recipeAdd?.isVegan}
            name="isVegan"
            setIsOpen={() =>
              setRecipeAdd({...recipeAdd, isVegan: !recipeAdd.isVegan})
            }
          />
          <OnOfButton
            isOpen={recipeAdd?.isKosher}
            name="isKosher"
            setIsOpen={() =>
              setRecipeAdd({...recipeAdd, isKosher: !recipeAdd.isKosher})
            }
          />
        </View>
        <Text style={styles.TextSimple}>Dishes type:</Text>
        <CategoryRecipesSelector
          selected={selected}
          setSelected={setSelected}
        />
        <Text style={styles.TextSimple}>Spiceness:</Text>
        <SpicenessSelector setSpiceness={setSpiceness} />
        <Text style={styles.TextSimple}>Cook time (HH:MM):</Text>
        <TextInputRecipe
          name="cookTime"
          placeholder="Cook time (HH:MM)"
          value={recipeAdd?.cookTime}
          onChange={setRecipeAdd}
          state={recipeAdd}
        />
        <Text style={styles.TextSimple}>Prep time (HH:MM):</Text>
        <TextInputRecipe
          name="prepTime"
          placeholder="Prep time (HH:MM)"
          value={recipeAdd?.prepTime}
          onChange={setRecipeAdd}
          state={recipeAdd}
        />
        <Text style={styles.TextSimple}>Serves:</Text>
        <TextInputRecipe
          name="serves"
          placeholder="Number of serves"
          value={recipeAdd?.serves}
          onChange={setRecipeAdd}
          state={recipeAdd}
        />
        {ingredientsList.length > 0 && (
          <Text style={styles.TextTitle}>Ingredients</Text>
        )}
        <IngredientController
          ingredientsList={ingredientsList}
          setIngredientsList={setIngredientsList}
        />
        {recipeAdd.manualList.length !== 0 && (
          <Text style={styles.TextTitle}>Manual</Text>
        )}

        <Text style={styles.TextSimple}>Add recipe step:</Text>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.15)',
            width: '100%',
            padding: 10,
            marginVertical: 10,
            borderRadius: 5,
          }}>
          <ManualController
            manualList={manualList}
            setManualList={setManualList}
          />
        </View>

        {recipeAdd.tags.length !== 0 && (
          <Text style={styles.TextTitle}>Tags</Text>
        )}
        <Text style={styles.TextSimple}>Add Tag</Text>
        <TagController tags={tags} setTags={setTags} />
      </View>
      <View
        style={{
          flex: 1,
          flexGrow: 1,
          width: '100%',
          alignItems: 'center',
          marginVertical: 20,
        }}>
        <Text style={styles.TextTitle}> Exta steps for better taste</Text>
        <Text style={styles.TextSimple}>Title for tips:</Text>

        <TextInputRecipe
          name="tipTitle"
          placeholder="Title for the tip"
          value={recipeAdd?.tipTitle}
          onChange={setRecipeAdd}
          state={recipeAdd}
        />
        <Text style={styles.TextSimple}>Desciption for tips:</Text>

        <TextInputRecipe
          name="tipDescription"
          placeholder="description for the tip"
          value={recipeAdd?.tipDescription}
          onChange={setRecipeAdd}
          state={recipeAdd}
        />

        {tipIngredientsList.length > 0 && (
          <Text style={styles.TextTitle}>Ingredients for tips</Text>
        )}
        <IngredientController
          ingredientsList={tipIngredientsList}
          setIngredientsList={setTipIngredientsList}
        />
        {recipeAdd.tipManualList.length !== 0 && (
          <Text style={styles.TextTitle}>Manual for tips</Text>
        )}

        <Text style={styles.TextSimple}>Add tip step:</Text>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.15)',
            width: '100%',
            padding: 10,
            marginVertical: 10,
            borderRadius: 5,
          }}>
          <ManualController
            manualList={tipManualList}
            setManualList={setTipManualList}
          />
        </View>

        <Text>{getAddRecipeError()}</Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#EA3651',
            padding: 20,
            paddingVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}
          onPress={() => {
            dispatch(addRecipe(recipeAdd));
          }}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>
            Submit new Recipe
          </Text>
        </TouchableOpacity>
      </View>
    </LoggedInBackground>
  );
};

const styles = StyleSheet.create({
  TextTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
    color: 'white',
  },
  insideButtonSelector: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: 'red',
  },
  TextSimple: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
    color: 'white',
    textAlign: 'left',
  },
  TextSimple2: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
    color: 'white',
    textAlign: 'left',
    textTransform: 'capitalize',
  },
});
export {styles as RecipeStyles};
export default Recipesadd;
