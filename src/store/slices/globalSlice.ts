import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  language: string;
}

const initialState: GlobalState = {
  language: 'en-US',
};

const globalSlice = createSlice({
  name: 'globalSlice',
  initialState,
  reducers: {
    changeLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    }
  },
});

export const { changeLanguage } = globalSlice.actions;

export default globalSlice.reducer;
