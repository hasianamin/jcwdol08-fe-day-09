import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemons: JSON.parse(localStorage.getItem("pokemon")) || [],
};

export const pokemon = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    catchPokemon: (state, action) => {
      state.pokemons.push(action.payload);
      console.log(state.pokemons);
      localStorage.setItem("pokemon", JSON.stringify(state.pokemons));
    },
    releasePokemon: (state, action) => {
      const indexToRelease = state.pokemons.findIndex((pokemon) => {
        return pokemon.name === action.payload.name;
      });
      state.pokemons.splice(indexToRelease, 1);
      localStorage.setItem("pokemon", JSON.stringify(state.pokemons));
    },
  },
});

export const { catchPokemon, releasePokemon } = pokemon.actions;
export default pokemon.reducer;
