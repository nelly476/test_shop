import qs from "qs";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from "../../../lib/axios";
import axios from "axios";
import type { Product, GetItemsArgs } from './cartSlice';

export const getItems = createAsyncThunk<
  Product[],
  GetItemsArgs | undefined,
  { rejectValue: string }
>(
  "items/fetch",
  async ({ category = [], sort, order } = {}, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get<Product[]>("/products", {
        params: {
          category,
          _sort: sort,
          _order: order,
        },
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: "repeat" }),
      });
      return res.data;
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? ((err.response?.data as { message?: string } | undefined)?.message ??
            err.message)
        : (err as Error)?.message ?? "Ошибка загрузки";

      return rejectWithValue(message);
    }
  }
);
