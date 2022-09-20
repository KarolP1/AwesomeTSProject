export interface IRecipe {
  _id: string;
  owner: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    name: string;
  };
  isEstablishment: boolean;
  title: string;
  description: string;
  cuisine: ICuisine;
  advancement: number;
  prepTime: string;
  cookTime: string;
  serves: number;
  isKosher: boolean;
  isVegan: boolean;
  isHalal: boolean;
  dishesType: string;
  ingredients: IIngredient[];
  manual: IManual[];
  tipTitle: string;
  tipDescription: string;
  tipIngredients: IIngredient[];
  tipManual: IManual[];
  tags: string[];
  counter: ICounter;
  __v: 0;
}

export interface ICuisine {
  _id: string;
  code: string;
  name: string;
  oryginalName: string;
}

export interface ICounter {
  _id: string;
  numberOfClicks: number;
  numberOfLikes: number;
  numberOfShares: number;
  whoLike: string[];
  whoShare: string[];
  __v: 0;
}

export interface IIngredient {
  qtt: number;
  unit: string;
  name: string;
  _id: string;
}

export interface IManual {
  stepNumber: number;
  description: string;
  _id: string;
}
