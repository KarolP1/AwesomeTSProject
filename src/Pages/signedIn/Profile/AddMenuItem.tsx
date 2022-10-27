import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {
  IIngredientEstablishment,
  IMenuItem,
} from '../../../redux/Profile/establishmentMenus/types';
import CategoryRecipesSelector from '../../../components/categorySelector';
import {allCategoriesOrder} from '../../../components/categorySelector/allCategories';
import {SpicenessList} from '../../../static/spiceness';
import SpicenesSelector from '../../../components/selectors/SpicenesSelector';
import BooleansSelectors from '../../../components/selectors/BooleansSelectors';
import TextInputProfile from '../../../components/TextInputs/TextInputCuisine';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SubmitButton from '../../../components/touchables/SubmitButton';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {PostMyEstabishmentMenuItem} from '../../../redux/Profile/establishmentMenus/establishmentMenuItem/addEstablishmentMenuItem';
import {
  ProfileNavigationAddMenuItems,
  ProfileNavigationPropsAddMenuItems,
} from '../../../navigation/Profile/ProfileNavigator.types';
import {cleanUpMyEstablishmentMenusGet} from '../../../redux/Profile/establishmentMenus/EstablishmentMenu.slice';
import {useNavigation} from '@react-navigation/native';
import IngredientForEstablishmentController from '../../../components/Profile/Sections/Job/MenuListUpdateAndGet/IngredientForEstablishmentController';

const ProfileNavigationAddMenuItemsPage = (
  props: ProfileNavigationPropsAddMenuItems,
) => {
  const navigation = useNavigation<ProfileNavigationAddMenuItems>();
  const [haveBeenrun, setHaveBeenRun] = useState<boolean>(false);

  const menuId = props.route.params.menuId;
  const [newMenuItemState, setNewMenuItemState] = useState<IMenuItem>({
    dishName: '',
    dishDescription: '',
    price: '',
    currency: '',
    isDishForDelivery: true,
    category: '',
    spiceness: '',
    isVegan: false,
    isKosher: false,
    isHalal: false,
    dishIngredients: [],
  });
  const dispatch = useAppDispatch();

  const [selected, setSelected] = useState<
    0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | null
  >(null);
  const categories = allCategoriesOrder();

  useEffect(() => {
    if (selected)
      setNewMenuItemState({
        ...newMenuItemState,
        category: categories[selected].cagetoryName,
      });
  }, [selected]);

  const {succes} = useAppSelector(state => state.MyEstabishmentMenus);
  useEffect(() => {
    if (succes && haveBeenrun) {
      navigation.navigate('ProfileHome');
      setHaveBeenRun(false);
    }
  }, [succes, haveBeenrun]);

  return (
    <LoggedInBackground>
      <Text style={styles.title}>Title</Text>
      <TextInputProfile
        placeholder={'Dish Name'}
        onChange={setNewMenuItemState}
        name={'dishName'}
        value={newMenuItemState.dishName}
        state={newMenuItemState}
      />
      <Text style={styles.title}>Description</Text>
      <TextInputProfile
        placeholder={'Dish Description'}
        onChange={setNewMenuItemState}
        name={'dishDescription'}
        value={newMenuItemState.dishDescription}
        state={newMenuItemState}
      />

      {/* cuisine Selector  **/}
      <Text style={styles.title}>Types</Text>
      <BooleansSelectors
        setBooleanDataState={(
          isVegan: boolean,
          isHalal: boolean,
          isKosher: boolean,
        ) => {
          setNewMenuItemState({
            ...newMenuItemState,
            isVegan,
            isHalal,
            isKosher,
          });
        }}
      />
      <Text style={styles.title}>Dishes category</Text>

      <CategoryRecipesSelector
        selected={selected}
        setSelected={setSelected}
        categoriesProp={categories}
      />
      <Text style={styles.title}>Spiceness category</Text>

      <SpicenesSelector
        setSpiceness={(text: string) =>
          setNewMenuItemState({...newMenuItemState, spiceness: text})
        }
      />

      <Text style={styles.title}>Currency </Text>
      <TextInputProfile
        placeholder={'currency'}
        onChange={setNewMenuItemState}
        name={'currency'}
        value={newMenuItemState.currency}
        state={newMenuItemState}
      />
      <Text style={styles.title}>Price</Text>
      <TextInputProfile
        placeholder={'Dish Price'}
        onChange={setNewMenuItemState}
        name={'price'}
        value={newMenuItemState.price}
        state={newMenuItemState}
      />
      <IngredientForEstablishmentController
        ingredients={newMenuItemState.dishIngredients}
        setIngredients={(
          ingredients: IIngredientEstablishment[] | undefined,
        ) => {
          setNewMenuItemState({
            ...newMenuItemState,
            dishIngredients: ingredients,
          });
        }}
      />
      <SubmitButton
        title="Submit new Item"
        onPress={() => {
          dispatch(cleanUpMyEstablishmentMenusGet());
          dispatch(
            PostMyEstabishmentMenuItem({
              menuID: menuId,
              menuItem: newMenuItemState,
            }),
          );
          setHaveBeenRun(true);
        }}
      />
    </LoggedInBackground>
  );
};

export default ProfileNavigationAddMenuItemsPage;

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontFamily: 'Handlee-Regular',
    fontSize: 20,
    marginTop: 5,
  },
});
