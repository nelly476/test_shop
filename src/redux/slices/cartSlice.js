import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const getItems = createAsyncThunk(
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

      const res = await axiosInstance.get(url);
      return res.data; // массив товаров
    } catch (err) {
      return rejectWithValue(err?.message || "Ошибка загрузки");
    }
  }
);



const cartSlice = createSlice({
  name: 'cart',
  initialState: { 
    items: [],
    total: 0,
    status: 'idle', 
    cart: {},
  },
  reducers: {
    addToCart: (state, action) => {
      const {id} = action.payload;
      state.cart[id] = state.cart[id] ? { ...action.payload, qty: state.cart[id].qty + 1 } : { ...action.payload, qty: 1 };
    },
 decreaseInCart: (state, action) => {
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
      // .addCase(getAllItems.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(getAllItems.fulfilled, (state, action) => {
      //     state.total = action.payload.length;
      //   state.status = 'succeeded';
      // })
      // .addCase(getAllItems.rejected, (state) => {
      //   state.status = 'failed';
      // })
  },
});

export const { addToCart, removeFromCart, setQty, clearCart, decreaseInCart } = cartSlice.actions;

export default cartSlice.reducer;