import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from "../../../lib/axios";
import axios from "axios";
import type { Product, GetItemsArgs } from './cartSlice';

export const getItems = createAsyncThunk<
  Product[],
  GetItemsArgs | undefined,
  { rejectValue: string }
>("items/fetch", async ({ category = [], sort, order } = {}, { rejectWithValue }) => {
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
    const message = axios.isAxiosError(err)
      ? ((err.response?.data as { message?: string } | undefined)?.message ?? err.message)
      : ((err as Error)?.message ?? "Ошибка загрузки");

    return rejectWithValue(message);
  }
});