import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  apiAddContacts,
  apiDeleteContacts,
  apiGetContacts,
} from "./operations";

const INITIAL_STATE = {
  contacts: [],
  isLoading: false,
  isError: false,
};

export const contactsSlice = createSlice({
  
  name: "contacts", 
  initialState: INITIAL_STATE, 
  extraReducers: (builders) => {
    builders

      .addCase(apiGetContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(apiAddContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts.push(action.payload);
        // state.contacts = [...state.contacts, action.payload];
      })
      .addCase(apiDeleteContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload.id
        );
      })
      .addMatcher(
        isAnyOf(
          apiGetContacts.pending,
          apiAddContacts.pending,
          apiDeleteContacts.pending
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          apiGetContacts.rejected,
          apiAddContacts.rejected,
          apiDeleteContacts.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      );
  },
});

// Редюсер слайсу
export const contactsReducer = contactsSlice.reducer;
