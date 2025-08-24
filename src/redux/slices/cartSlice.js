import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const getItems = createAsyncThunk(
  'items/fetch',
  async ({ offset = 0, limit = 20, search = '' }) => {
    const res = await axiosInstance.get('/products', {
      params: {
        _start: offset,
        _end: offset + limit,
        q: search,
      },
    });
    return res.data;
  }
);

export const getAllItems = createAsyncThunk(
  'items/fetchAll',
  async () => {
    const res = await axiosInstance.get('/products');
    return res.data;
  }
);


const cartSlice = createSlice({
  name: 'cart',
  initialState: { 
    items: {},
    allItems: [],
    status: 'idle', }, // { [productId]: { id, qty } }
  reducers: {
  //   addToCart: (state, action) => {
  //     const id = action.payload.id;
  //     state.items[id] = state.items[id] ? { id, qty: state.items[id].qty + 1 } : { id, qty: 1 };
  //   },
  //   removeFromCart: (state, action) => { delete state.items[action.payload.id]; },
  //   setQty: (state, action) => {
  //     const { id, qty } = action.payload;
  //     if (qty <= 0) delete state.items[id];
  //     else state.items[id] = { id, qty };
  //   },
  //   clearCart: (state) => { state.items = {}; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getItems.fulfilled, (state, action) => {
        // if (action.meta.arg.offset > 0) {
        //   state.data = [...state.data, ...action.payload];
        // } else {
          state.items = action.payload;
        // }
        state.status = 'succeeded';
      })
      .addCase(getItems.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getAllItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllItems.fulfilled, (state, action) => {
          state.allItems = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getAllItems.rejected, (state) => {
        state.status = 'failed';
      })
  },
});

export const { addToCart, removeFromCart, setQty, clearCart } = cartSlice.actions;

export default cartSlice.reducer;