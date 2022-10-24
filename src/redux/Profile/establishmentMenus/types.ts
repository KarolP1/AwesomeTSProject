export interface IResponseGetMyEstablishmentMenus {
  error: any | undefined;
  message: string | undefined;
  data?: IGetMenuTitles[] | null;
  isLoading: boolean;
  succes: boolean;
}

interface IMenuItem {
  _id?: string;
  dishName: string;
  isDishForDelivery: boolean;
  price: string;
  currency: string;
  dishDescription?: string;
  category: string;
  dishIngredients: [];
}

export interface IIsCategoryVisible {
  isVisible: boolean;
  categoryName: string;
  _id: string;
}

export interface IGetMenuTitles {
  _id: string;
  menuName: string;
  establishmentId: string;
  isOurMenuSubmenuVisible: boolean;
  menuItems: IMenuItem[] | [];
  categoryVisibility: IIsCategoryVisible[];
}
