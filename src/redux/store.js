import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./reducer/pokemon";

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});
