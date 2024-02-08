import { createAsyncThunk } from "@reduxjs/toolkit";

// Assuming apis.dynamicUiApi is correctly defined to be "https://swapi.dev/api/people/"
export const fetchPeopleData = createAsyncThunk(
  "user/fetchPeopleData",
  async ({ page, searchQuery }) => {
    try {
      const response = await fetch(
        searchQuery?.trim()?.length > 0
          ? `https://swapi.dev/api/people/?search=${searchQuery}`
          : `https://swapi.dev/api/people/?page=${page} `
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
);
export const fetchSpeciesData = createAsyncThunk(
  "user/fetchSpeciesData",
  async (speciesEndPoint) => {
    try {
      const response = await fetch(
        `https://swapi.dev/api/` + `${speciesEndPoint}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
);
