import { createSelector } from "@reduxjs/toolkit";

export const selectCartItems = (s) => s.cart.items;
export const selectCartIds = createSelector(selectCartItems, (items) => Object.keys(items));
export const makeSelectCartItemById = (id) =>
  createSelector(selectCartItems, (items) => items[id]);

export const selectCartCount = createSelector(selectCartItems, (items) =>
  Object.values(items).reduce((acc, it) => acc + it.qty, 0)
);