import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IIngredientEstablishment} from '../../../../../redux/Profile/establishmentMenus/types';
import TickButton from '../../../../buttons/tickButton';
import TextInputProfile from '../../../../TextInputs/TextInputProfile';
import SubmitButton from '../../../../touchables/SubmitButton';

const IngredientForEstablishmentController = ({
  ingredients,
  setIngredients,
}: {
  ingredients?: IIngredientEstablishment[];
  setIngredients: (ingredients: IIngredientEstablishment[]) => void;
}) => {
  const [booleans, setBooleans] = useState([
    {name: 'is Ingredient Visible', value: false},
    {name: 'is Ingredient Editable', value: false},
  ]);
  const initialNewIngredient = {
    qtt: '',
    unit: '',
    name: '',
    isIngredientVisible: false,
    isIngredientEditable: false,
  };
  const [newIngredient, setNewIngredient] = useState(initialNewIngredient);
  useEffect(() => {
    setNewIngredient({
      ...newIngredient,
      isIngredientVisible: booleans[0].value,
      isIngredientEditable: booleans[1].value,
    });
  }, [booleans]);

  return (
    <View style={{width: '100%'}}>
      {ingredients && ingredients.length !== 0 && (
        <>
          <Text style={styles.title}>List of ingredients</Text>
          <View>
            {ingredients.map((ingredient, index) => (
              <View key={index} style={{position: 'relative'}}>
                {ingredient && (
                  <TextInputProfile
                    key={index}
                    name={ingredient?.name}
                    disabled={true}
                    onChange={() => {}}
                    placeholder=""
                    value={`${ingredient?.name} ${ingredient?.qtt} ${ingredient?.unit}`}
                  />
                )}
                <TouchableOpacity
                  onPress={() => {
                    const filteredIngredients = ingredients.map(item => {
                      if (
                        item?.isIngredientEditable ===
                          ingredient.isIngredientEditable &&
                        item?.isIngredientVisible ===
                          ingredient.isIngredientVisible &&
                        item?.name === ingredient.name &&
                        item?.qtt === ingredient.qtt &&
                        item?.unit === ingredient.unit
                      )
                        return undefined;
                      else return item;
                    });
                    //@ts-ignore
                    setIngredients(filteredIngredients);
                    const ingredientsFilter = filteredIngredients.filter(
                      item => item !== undefined,
                    );
                    //@ts-ignore
                    setIngredients(ingredientsFilter);
                  }}
                  style={{position: 'absolute', right: 10, top: 15}}>
                  <Image
                    style={{width: 20, height: 20}}
                    source={require('../../../../../assets/utilityIcons/deleteC.png')}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </>
      )}

      <Text style={styles.title}>Add ingredients</Text>

      <TextInputProfile
        name="qtt"
        state={newIngredient}
        placeholder="qtt"
        value={newIngredient.qtt}
        onChange={setNewIngredient}
      />
      <TextInputProfile
        placeholder="unit"
        value={newIngredient.unit}
        onChange={setNewIngredient}
        name="unit"
        state={newIngredient}
      />
      <TextInputProfile
        placeholder="name"
        value={newIngredient.name}
        onChange={setNewIngredient}
        name={'name'}
        state={newIngredient}
      />
      <View style={{width: '100%'}}>
        {booleans.map(button => {
          return (
            <TickButton
              key={button.name}
              selected={button.value}
              title={button.name}
              setSelected={() => {
                const newBooleans = booleans.map(bol =>
                  bol.name !== button.name ? bol : {...bol, value: !bol.value},
                );
                setBooleans(newBooleans);
              }}
            />
          );
        })}
        <SubmitButton
          onPress={() => {
            if (
              newIngredient.name !== '' ||
              newIngredient.qtt !== '' ||
              newIngredient.unit !== ''
            ) {
              if (ingredients) {
                setIngredients([...ingredients, newIngredient]);
                setNewIngredient(initialNewIngredient);
              }
            } else {
              Alert.alert('Warning', 'you have to specify ingredients');
            }
          }}
          title={'add ingredient'}
        />
        <View style={{height: 50}}></View>
      </View>
    </View>
  );
};

export default IngredientForEstablishmentController;

const styles = StyleSheet.create({
  shadowStyle: {
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
    height: 50,
    minWidth: 200,
  },
  title: {
    color: '#fff',
    fontFamily: 'Handlee-Regular',
    fontSize: 20,
    marginTop: 5,
  },
});
