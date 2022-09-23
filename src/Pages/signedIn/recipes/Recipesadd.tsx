import {Text, View} from 'react-native';
import React, {useState} from 'react';
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

export interface IIngredientList {
  qtt: number;
  unit: string;
  name: string;
}
export interface IManualList {
  stepNumber: number;
  description: string;
  imageUrl?: string;
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
          name="title"
          placeholder="Title"
          value={recipeAdd?.title}
          onChange={setRecipeAdd}
        />
        <TextInputRecipe
          name="title"
          placeholder="Title"
          value={recipeAdd?.title}
          onChange={setRecipeAdd}
        />
        <Text>addRecipes</Text>
      </View>
    </LoggedInBackground>
  );
};

export default Recipesadd;
