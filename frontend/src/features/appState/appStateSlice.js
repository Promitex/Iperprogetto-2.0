// src/features/appState/appStateSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoria: null,
  tipologia: null,
  sottoTipologia: null,
  voceSelezionata: null,
  data: [],
  loading: true,
  searchQuery: '',
  expandedNodes: {},
};

const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setCategoria(state, action) {
      state.categoria = action.payload;
    },
    setTipologia(state, action) {
      state.tipologia = action.payload;
    },
    setSottoTipologia(state, action) {
      state.sottoTipologia = action.payload;
    },
    setVoceSelezionata(state, action) {
      state.voceSelezionata = action.payload;
    },
    setData(state, action) {
      state.data = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    
  },
});

export const {
  setCategoria,
  setTipologia,
  setSottoTipologia,
  setVoceSelezionata,
  setData,
  setLoading,
  setSearchQuery
} = appStateSlice.actions;

export default appStateSlice.reducer;
