import type { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const selectItems = (s: RootState) => s.cartSlice.items;
export const selectItemsCount = (s: RootState) => s.cartSlice.total;
export const selectCartStatus = (s: RootState) => s.cartSlice.status;
export const selectCart = (s: RootState) => s.cartSlice.cart;
export const selectCartProductQty = (productId: number) => (s: RootState) => s.cartSlice.cart[productId]?.qty ?? 0

export const selectCartList = createSelector([selectCart], (cart) => Object.values(cart));
export const selectTotalPrice = createSelector([selectCart], (cart) =>
  Object.values(cart).reduce((accum, curr) => accum + curr.qty * curr.price, 0),
);
