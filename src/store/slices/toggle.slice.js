import { createSlice } from "@reduxjs/toolkit";

export const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    tabs: [],
    activeTab: null,
  },
  reducers: {
    setTabs: (state, action) => {
      state.tabs = action?.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action?.payload;
    },
  },
});

export const { setTabs, setActiveTab } = toggleSlice.actions;

export default toggleSlice.reducer;
