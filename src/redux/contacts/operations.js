import { createAsyncThunk } from "@reduxjs/toolkit";

import { instance } from "../auth/operations";

export const apiGetContacts = createAsyncThunk(
  "contacts/getAllContacts",
  async (_, thunkApi) => {
    try {
      const { data } = await instance.get("/contacts");
      console.log("Contacts data", data);
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const apiAddContacts = createAsyncThunk(
  "contacts/addContact",
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post("/contacts", formData);
      console.log("Add Contacts data", data);
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const apiDeleteContacts = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkApi) => {
    try {
      const { data } = await instance.delete(`/contacts/${contactId}`);
      console.log("Add Contacts data", data);
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);
