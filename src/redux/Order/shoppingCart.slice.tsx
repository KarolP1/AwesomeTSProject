import {useAppSelector} from './../hooks';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IGetAddress} from '../Profile/types';

export interface ICartItemChange {
  ingredientId: string;
  qtt: string;
}

export interface ICartItemItem {
  itemId: string;
  changes?: ICartItemChange[];
}

export interface IShoppingCart {
  orderWhere: string;
  orderItems: ICartItemItem[];
}

const initialShoppingCart: {cartItems: IShoppingCart[] | null} = {
  cartItems: null,
};

export const ShoppingCartSlice = createSlice({
  name: 'ShoppingCart',
  initialState: initialShoppingCart,
  reducers: {
    addNewItemToCart: (
      state,
      {
        payload,
      }: PayloadAction<{
        orderWhere: string;
        orderItems: ICartItemItem;
      }>,
    ) => {
      const isEmpty =
        state.cartItems &&
        state.cartItems.filter(item => item.orderWhere === payload.orderWhere)
          .length !== 0
          ? false
          : true;
      console.log({isEmpty});

      if (!state.cartItems && isEmpty) {
        console.log('first');
        state.cartItems = [];
        state.cartItems.push({
          orderItems: [payload.orderItems],
          orderWhere: payload.orderWhere,
        });
      } else {
        state.cartItems?.map(cartItem => {
          if (cartItem.orderWhere === payload.orderWhere) {
            cartItem.orderItems.push(payload.orderItems);
            return cartItem;
          } else {
            return cartItem;
          }
        });
      }
    },
  },
  extraReducers: builder => {
    // builder.addCase(GetEstablishment.rejected, (state, {payload}) => {
    //   state.error = payload;
    //   state.succes = false;
    //   state.isLoading = false;
    // });
    // builder.addCase(
    //   GetEstablishment.fulfilled,
    //   (state, {payload}: PayloadAction<IEstablishment | any>) => {
    //     state.error = null;
    //     state.succes = true;
    //     state.data = payload.data;
    //     state.isLoading = false;
    //     state.message = payload.message;
    //   },
    // );
    // builder.addCase(GetEstablishment.pending, (state, {payload}) => {
    //   state.isLoading = true;
    // });
    ////////////////////////////////////////////////////////////////
  },
});

export const getMyRecipesError = () =>
  useAppSelector(state => state.establishment.error);
export const {addNewItemToCart} = ShoppingCartSlice.actions;
