export interface category {
  index: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  cagetoryName: string;
  categoryIcon: any;
}

export const allCategoriesRecipe: () => category[] = () => [
  {
    index: 0,
    cagetoryName: 'Bakeries',
    categoryIcon: require('../../assets/utilityIcons/recipesMenu/bakery.png'),
  },
  {
    index: 1,
    cagetoryName: 'Salads',
    categoryIcon: require('../../assets/utilityIcons/recipesMenu/salads.png'),
  },
  {
    index: 2,
    cagetoryName: 'Soups',
    categoryIcon: require('../../assets/utilityIcons/recipesMenu/soup.png'),
  },
  {
    index: 3,
    cagetoryName: 'Dairy',
    categoryIcon: require('../../assets/utilityIcons/recipesMenu/dairy.png'),
  },
  {
    index: 4,
    cagetoryName: 'Mains',
    categoryIcon: require('../../assets/utilityIcons/recipesMenu/mains.png'),
  },
  {
    index: 5,
    cagetoryName: 'Sides',
    categoryIcon: require('../../assets/utilityIcons/recipesMenu/sides.png'),
  },
  {
    index: 6,
    cagetoryName: 'Beverages',
    categoryIcon: require('../../assets/utilityIcons/recipesMenu/beverages.png'),
  },
  {
    index: 7,
    cagetoryName: 'Pickles',
    categoryIcon: require('../../assets/utilityIcons/recipesMenu/pickles.png'),
  },
  {
    index: 8,
    cagetoryName: 'Snacks',
    categoryIcon: require('../../assets/utilityIcons/recipesMenu/snacks.png'),
  },
  {
    index: 9,
    cagetoryName: 'Occasion',
    categoryIcon: require('../../assets/utilityIcons/recipesMenu/occasions.png'),
  },
];
export const allCategoriesOrder: () => category[] = () => [
  {
    index: 1,
    cagetoryName: 'bakeries',
    categoryIcon: require('../../assets/utilityIcons/establishment/bakries.png'),
  },
  {
    index: 2,
    cagetoryName: 'starters',
    categoryIcon: require('../../assets/utilityIcons/establishment/starters.png'),
  },
  {
    index: 3,
    cagetoryName: 'sides',
    categoryIcon: require('../../assets/utilityIcons/establishment/sides.png'),
  },
  {
    index: 4,
    cagetoryName: 'soups',
    categoryIcon: require('../../assets/utilityIcons/establishment/soups.png'),
  },
  {
    index: 5,
    cagetoryName: 'mains',
    categoryIcon: require('../../assets/utilityIcons/establishment/mains.png'),
  },
  {
    index: 6,
    cagetoryName: 'desserts',
    categoryIcon: require('../../assets/utilityIcons/establishment/desserts.png'),
  },
  {
    index: 7,
    cagetoryName: 'beverages',
    categoryIcon: require('../../assets/utilityIcons/establishment/beverages.png'),
  },
  {
    index: 8,
    cagetoryName: 'alc beverages',
    categoryIcon: require('../../assets/utilityIcons/establishment/alcbeverages.png'),
  },
  {
    index: 9,
    cagetoryName: 'products',
    categoryIcon: require('../../assets/utilityIcons/establishment/products.png'),
  },
];
