import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import TextInputRecipe from '../../../components/TextInputs/TextInputRecipe';
import {IIngredientList} from './Recipesadd';
import DelleteDot from '../../../components/Icons/delleteDot';

const IngredientController = ({
  ingredientsList,
  setIngredientsList,
}: {
  ingredientsList: IIngredientList[];
  setIngredientsList: React.Dispatch<React.SetStateAction<IIngredientList[]>>;
}) => {
  const [ingredient, setIngredient] = useState<IIngredientList>();

  const setupingredientsList = async () => {
    if (ingredient) {
      if (
        ingredient.name === '' ||
        ingredient.unit === '' ||
        ingredient.qtt === ''
      ) {
        Alert.alert('you have to provide ingredient information');
      } else {
        setIngredientsList([...ingredientsList, ingredient]);
      }
    } else if (ingredient === undefined)
      Alert.alert('you have to provide ingredient information');
    setIngredient({name: '', unit: '', qtt: '', _id: ''});
  };
  const formatedIngredientsList = ingredientsList?.map((ingredient, index) => ({
    ...ingredient,
    _id: index.toString(),
  }));

  return (
    <View style={{width: '100%'}}>
      {ingredientsList !== undefined && (
        <View>
          {formatedIngredientsList?.map((ingredient, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: 'rgba(0,0,0,.15)',
                  marginVertical: 3,
                  paddingHorizontal: 10,
                  borderRadius: 15,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#fff', marginVertical: 4}}>
                  {ingredient.qtt} {ingredient.unit}
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    marginVertical: 4,
                    marginHorizontal: 20,
                    flexWrap: 'wrap',
                  }}>
                  {ingredient.name}
                </Text>
                <DelleteDot
                  onPress={() => {
                    const filteredIngredients = formatedIngredientsList.filter(
                      item => ingredient._id !== item._id,
                    );
                    setIngredientsList(filteredIngredients);
                  }}
                />
              </View>
            );
          })}
        </View>
      )}
      <View>
        <Text
          style={{
            color: '#fff',
            marginVertical: 20,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Add ingredients
        </Text>
        <TextInputRecipe
          placeholder="qtt"
          value={ingredient?.qtt?.toString()}
          onChange={setIngredient}
          name={'qtt'}
          state={ingredient}
        />
        <TextInputRecipe
          placeholder="Unit"
          value={ingredient?.unit}
          onChange={setIngredient}
          name={'unit'}
          state={ingredient}
        />
        <TextInputRecipe
          placeholder="Name"
          value={ingredient?.name}
          onChange={setIngredient}
          name={'name'}
          state={ingredient}
        />
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <TouchableOpacity
            onPress={setupingredientsList}
            style={{
              backgroundColor: '#EA3651',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
            }}>
            <Text style={{color: '#fff'}}>Add ingredient</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default IngredientController;

const styles = StyleSheet.create({});
