import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./../store" ;
import { axiosInstance } from "../../lib/axios";
import axios from "axios";


export interface Product {
  id: number;
  price: number;
  name: string;
  image: string;
  category: string;
}

export interface CartItemType extends Product {
  qty: number;
}

export type Status = "idle" | "loading" | "succeeded" | "failed";

export interface State {
  items: Product[];   
  total: number,                 // товары в корзине
  status: Status;                 // статус загрузки каталога
  cart: Record<number, CartItemType>;   // корзина по id
}

export interface GetItemsArgs {
  category?: string[]; // ?category=a&category=b
  sort?: string;       // _sort=price
  order?: "asc" | "desc"; // _order=asc
}

export const getItems = createAsyncThunk<
Product[], 
GetItemsArgs | undefined,
{ rejectValue: string }
>(
  "items/fetch",
  async (
    { category = [], sort, order } = {},
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();

      // категории: ?category=a&category=b
      if (Array.isArray(category) && category.length > 0) {
        category.forEach((c) => params.append("category", c));
      }

      // сортировка: _sort=price&_order=asc
      if (sort) params.set("_sort", sort);
      if (order) params.set("_order", order);

      const qs = params.toString();
      const url = `/products${qs ? `?${qs}` : ""}`;

      const res = await axiosInstance.get<Product[]>(url);
      return res.data; // массив товаров
    } catch (err: unknown) {
  const message =
    axios.isAxiosError(err)
      ? (err.response?.data as { message?: string } | undefined)?.message ?? err.message
      : (err as Error)?.message ?? "Ошибка загрузки";

  return rejectWithValue(message);
}
  }
);

const state: State = { 
    items: [],
    total: 0,
    status: 'idle', 
    cart: {},
  }


const cartSlice = createSlice({
  name: 'cart',
  initialState: state,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const {id} = action.payload;
      state.cart[id] = state.cart[id] ? { ...action.payload, qty: state.cart[id].qty + 1 } : { ...action.payload, qty: 1 };
    },
 decreaseInCart: (state, action: PayloadAction<number>) => {
  const id = action.payload;
  const item = state.cart[id];
  if (!item) return;

  if (item.qty > 1) {
    item.qty -= 1;
  } else {
    delete state.cart[id];
  }
},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.items = action.payload
        state.total = action.payload.length
        state.status = 'succeeded';
      })
      .addCase(getItems.rejected, (state) => {
        state.status = 'failed';
      })
  },
});

export const { addToCart, decreaseInCart } = cartSlice.actions;

export default cartSlice.reducer;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;