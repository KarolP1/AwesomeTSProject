import recipes from '..';
import {IRecipeAdd} from './../../../Pages/signedIn/recipes/Recipesadd';
export const checkIfAddRecipeIsCorrect = (recipe: IRecipeAdd) => {
  if (
    recipe.title === '' ||
    recipe.title === undefined ||
    recipe.description === '' ||
    recipe.title === undefined ||
    recipe.cuisineCode === null ||
    recipe.cuisineCode === '' ||
    recipe.dishesType === null ||
    recipe.prepTime === '' ||
    recipe.prepTime === '00:00' ||
    recipe.prepTime === undefined ||
    recipe.cookTime === '' ||
    recipe.cookTime === '00:00' ||
    recipe.cookTime === undefined ||
    recipe.serves === null ||
    recipe.serves === undefined ||
    recipe.serves === '' ||
    recipe.serves === '0' ||
    recipe.ingredientsList.length === 0 ||
    recipe.ingredientsList === undefined ||
    recipe.manualList.length === 0 ||
    recipe.manualList === undefined
  )
    return true;
  else {
    recipe.manualList.forEach(recipeItem => {
      if (recipeItem._id) delete recipeItem._id;
    });
    recipe.ingredientsList.forEach(recipeItem => {
      if (recipeItem._id) delete recipeItem._id;
    });
    recipe.tipManualList.forEach(recipeItem => {
      if (recipeItem._id) delete recipeItem._id;
    });
    recipe.tipIngredientsList.forEach(recipeItem => {
      if (recipeItem._id) delete recipeItem._id;
    });
    return false;
  }
};
