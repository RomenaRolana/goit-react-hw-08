import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import {
  fetchApiRegister,
  fetchApiLogIn,
  fetchApiRefreshUser,
  apiLogOut,
} from "./operations";

const INITIAL_STATE = {
  isLoggedIn: false,
  userData: null,
  token: null,
  isLoading: false,
  isError: false,
};

export const authSlice = createSlice({
  
  name: "auth", 
  initialState: INITIAL_STATE, 
  extraReducers: (builders) => {
    builders

      .addCase(fetchApiRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })

      .addCase(fetchApiLogIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })

      .addCase(fetchApiRefreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userData = action.payload;
      })

      .addCase(apiLogOut.fulfilled, () => {
        return INITIAL_STATE;
      })

      .addMatcher(
        isAnyOf(
          apiLogOut.pending,
          fetchApiRefreshUser.pending,
          fetchApiLogIn.pending,
          fetchApiRegister.pending
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          apiLogOut.rejected,
          fetchApiRefreshUser.rejected,
          fetchApiLogIn.rejected,
          fetchApiRegister.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      );
  },
});

// Редюсер слайсу
export const authReducer = authSlice.reducer;
