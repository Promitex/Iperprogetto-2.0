import { createSelector } from '@reduxjs/toolkit';

const selectAppState = (state) => state.appState;

export const selectCategoria = createSelector([selectAppState], (s) => s.categoria);
export const selectTipologia = createSelector([selectAppState], (s) => s.tipologia);
export const selectSottoTipologia = createSelector([selectAppState], (s) => s.sottoTipologia);
export const selectVoceSelezionata = createSelector([selectAppState], (s) => s.voceSelezionata);
export const selectData = createSelector([selectAppState], (s) => s.data);
export const selectLoading = createSelector([selectAppState], (s) => s.loading);
export const selectSearchQuery = createSelector([selectAppState], (s) => s.searchQuery);
