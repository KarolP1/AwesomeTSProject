import {Text, View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {useAppDispatch} from '../../../redux/hooks';
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
import TagController from './TagController';

export interface IIngredientList {
  _id: string;
  qtt?: string;
  unit: string;
  name: string;
}
export interface IManualList {
  _id: string | null;
  stepNumber?: string;
  description?: string;
  imageUrl?: ImagePickerResponse;
}
export interface IRecipeAdd {
  title: string;
  description: string;
  cuisineCode: string;
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
  serves: number;
  manualList: IManualList[];
  tipTitle: string;
  tipDescription: string;
  tipIngredientsList: IIngredientList[];
  tipManualList: IManualList[];
  tags: string[];
}
const initialState: IRecipeAdd = {
  title: '',
  description: '',
  cuisineCode: '',
  isKosher: false,
  isVegan: false,
  isHalal: false,
  dishesType: '',
  spiceness: 'normal',
  ingredientsList: [],
  isEstablishment: false,
  advancement: 1,
  prepTime: '00:00',
  cookTime: '00:00',
  serves: 0,
  manualList: [],
  tipTitle: '',
  tipDescription: '',
  tipIngredientsList: [],
  tipManualList: [],
  tags: [],
};

const Recipesadd = () => {
  const dispatch = useAppDispatch();
  const token = getTokens();
  const [image, setImage] = useState<ImagePickerResponse | null>(null);
  const [selected, setSelected] = useState<
    0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null
  >(null);
  const [recipeAdd, setRecipeAdd] = useState<IRecipeAdd>(initialState);
  const [manualList, setManualList] = useState<IManualList[]>([]);
  const [ingredientsList, setIngredientsList] = useState<IIngredientList[]>([]);
  const [tipManualList, setTipManualList] = useState<IManualList[]>([]);
  const [tipIngredientsList, setTipIngredientsList] = useState<
    IIngredientList[]
  >([]);

  const [tags, setTags] = useState<string[]>([]);
  return (
    <LoggedInBackground>
      <View style={{flex: 1, flexGrow: 1, width: '100%', alignItems: 'center'}}>
        <AddImage image={image} setImage={setImage} />
        <TextInputRecipe
          name="title"
          placeholder="Title"
          value={recipeAdd?.title}
          onChange={setRecipeAdd}
        />
        <TextInputRecipe
          name="description"
          placeholder="Description"
          value={recipeAdd?.description}
          onChange={setRecipeAdd}
        />
        {/* <CuisineSearchbar
          cuisine={recipeAdd?.cuisineCode ? recipeAdd?.cuisineCode : ''}
          setCuisine={}
        /> */}
        <View style={{flexDirection: 'row'}}>
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
        <CategoryRecipesSelector
          selected={selected}
          setSelected={setSelected}
        />
        <SpicenessSelector />
        <TextInputRecipe
          name="cookTime"
          placeholder="Cook time (HH:MM)"
          value={recipeAdd?.title}
          onChange={setRecipeAdd}
        />
        <TextInputRecipe
          name="prepTime"
          placeholder="Prep time (HH:MM)"
          value={recipeAdd?.title}
          onChange={setRecipeAdd}
        />
        <TextInputRecipe
          name="serves"
          placeholder="Number of serves"
          value={recipeAdd?.title}
          onChange={setRecipeAdd}
        />
        <Text style={styles.TextTitle}>Ingredients</Text>
        <IngredientController
          ingredientsList={ingredientsList}
          setIngredientsList={setIngredientsList}
        />
        <Text style={styles.TextTitle}>Manual</Text>

        <ManualController
          manualList={manualList}
          setManualList={setManualList}
        />
        <Text style={styles.TextTitle}>Tags</Text>
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
        <TextInputRecipe
          name="tipTitle"
          placeholder="Title for the tip"
          value={recipeAdd?.tipTitle}
          onChange={setRecipeAdd}
        />
        <TextInputRecipe
          name="tipDescription"
          placeholder="description for the tip"
          value={recipeAdd?.tipDescription}
          onChange={setRecipeAdd}
        />
        <IngredientController
          ingredientsList={tipIngredientsList}
          setIngredientsList={setTipIngredientsList}
        />
        <ManualController
          manualList={tipManualList}
          setManualList={setTipManualList}
        />
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
});

export default Recipesadd;
