import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../api/products/type";
import { toast } from "react-toastify";
import { RootState } from "../../app/store";

interface CartValue extends Product {
  count: number;
  localId: string;
  note?: string;
}

export interface InitialState {
  cartValues: CartValue[];
}

const persisCartValues = localStorage.getItem("cartValues");
const initialState: InitialState = persisCartValues
  ? JSON.parse(persisCartValues)
  : {
      cartValues: [],
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartValues.push(action.payload);

      toast.success("product has been added successfully.");
    },
    clearCart: state => {
      state.cartValues = [];
    },
    clearProduct: (state, action) => {
      const productId = action.payload.id;
      return {
        cartValues: state.cartValues.filter(
          cartValue => cartValue.localId !== productId
        ),
      };
    },
    changeByAmount: (state, action) => {
      const productId = action.payload.id;
      return {
        cartValues: state.cartValues.map(cartValue =>
          cartValue.localId === productId
            ? {
                ...cartValue,
                count: Number(cartValue.count) + Number(action.payload.amount),
              }
            : cartValue
        ),
      };
    },
    incrementProductNumber: (state, action) => {
      const productId = action.payload.id;
      return {
        cartValues: state.cartValues.map(cartValue =>
          cartValue.localId === productId
            ? { ...cartValue, count: cartValue.count + 1 }
            : cartValue
        ),
      };
    },
    decrementProductNumber: (state, action) => {
      const productId = action.payload.id;
      return {
        cartValues: state.cartValues.map(cartValue =>
          cartValue.localId === productId
            ? { ...cartValue, count: cartValue.count - 1 }
            : cartValue
        ),
      };
    },
  },
});

export const selectCartValues = (state: RootState) => state.cartReducer;
export const {
  addToCart,
  clearCart,
  clearProduct,
  changeByAmount,
  incrementProductNumber,
  decrementProductNumber,
} = cartSlice.actions;

export default cartSlice.reducer;
