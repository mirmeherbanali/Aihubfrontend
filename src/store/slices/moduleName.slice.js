import { createSlice } from "@reduxjs/toolkit";

export const moduleNameSlice = createSlice({
  name: "moduleNameSetup",
  initialState: {
    moduleName: "Dashboard",
  },
  reducers: {
    setModuleName: (state, action) => {
      state.moduleName = action?.payload;
    },
  },
});

export const { setModuleName } = moduleNameSlice.actions;

export default moduleNameSlice.reducer;