import type { RootState } from "../store";

export const selectItems = (s: RootState) => s.cartSlice.items;
export const selectItemsCount = (s: RootState) => s.cartSlice.total;
export const selectCartStatus = (s: RootState) => s.cartSlice.status;
export const selectCart = (s: RootState) => s.cartSlice.cart;
export const selectCartList = (s: RootState) => Object.values(s.cartSlice.cart);