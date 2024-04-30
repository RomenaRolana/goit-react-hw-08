// Thunk
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
  baseURL: "https://connections-api.herokuapp.com",
});

// підключення ід користувача до запиту
export const setAuthToken = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// відключення ід користувача з запиту

export const removeAuthToken = () => {
  instance.defaults.headers.common.Authorization = "";
};

export const fetchApiRegister = createAsyncThunk(
  "auth/register",
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post("/users/signup", formData);
      console.log("Register data", data);
      setAuthToken(data.token);
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const fetchApiLogIn = createAsyncThunk(
  "auth/login",
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post("/users/login", formData);
      console.log("Register data", data);
      setAuthToken(data.token);
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const apiLogOut = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      await instance.post("/users/logout");
      removeAuthToken();
      return;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const fetchApiRefreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth.token;
      setAuthToken(token);
      const { data } = await instance.get("/users/current");
      console.log("Refresh data", data);

      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);
