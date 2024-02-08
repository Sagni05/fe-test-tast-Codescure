import { createSlice } from "@reduxjs/toolkit";
import { fetchPeopleData, fetchSpeciesData } from "../../action/userAction"; // Import the correct action

const initialState = {
  peopleData: null,
  speciesData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeopleData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.peopleData = null;
      })
      .addCase(fetchPeopleData.fulfilled, (state, action) => {
        state.loading = false;
        state.peopleData = action.payload;
      })
      .addCase(fetchPeopleData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSpeciesData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.speciesData = null;
      })
      .addCase(fetchSpeciesData.fulfilled, (state, action) => {
        state.loading = false;
        state.speciesData = action.payload;
      })
      .addCase(fetchSpeciesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
