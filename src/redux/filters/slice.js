import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { selectContacts } from "../contacts/selectors";
import { selectFilter } from "./selectors";
const INITIAL_STATE = {
  name: "",
};

// Мемоізований селектор для фільтрації контактів
export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filters) => {
    return contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(filters.toLowerCase());
    });
  }
);

export const filtersSlice = createSlice({
  // Ім'я слайсу
  name: "contacts", // Початковий стан редюсера слайсу
  initialState: INITIAL_STATE, // Об'єкт редюсерів
  reducers: {
    setFilter(state, action) {
      state.name = action.payload;
    },
  },
});

// Генератори екшенів
export const { setFilter } = filtersSlice.actions;

// Редюсер слайсу
export const filtersReducer = filtersSlice.reducer;
