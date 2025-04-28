import { useSelector, useDispatch } from 'react-redux';
import {
  setCategoria,
  setTipologia,
  setSottoTipologia,
  setVoceSelezionata,
  setData,
  setLoading,
  setSearchQuery
} from './appStateSlice';
import {
  selectCategoria,
  selectTipologia,
  selectSottoTipologia,
  selectVoceSelezionata,
  selectData,
  selectLoading,
  selectSearchQuery
} from './appStateSelectors';

export function useAppState() {
  const dispatch = useDispatch();

  return {
    categoria: useSelector(selectCategoria),
    setCategoria: (value) => dispatch(setCategoria(value)),

    tipologia: useSelector(selectTipologia),
    setTipologia: (value) => dispatch(setTipologia(value)),

    sottoTipologia: useSelector(selectSottoTipologia),
    setSottoTipologia: (value) => dispatch(setSottoTipologia(value)),

    voceSelezionata: useSelector(selectVoceSelezionata),
    setVoceSelezionata: (value) => dispatch(setVoceSelezionata(value)),

    data: useSelector(selectData),
    setData: (value) => dispatch(setData(value)),

    loading: useSelector(selectLoading),
    setLoading: (value) => dispatch(setLoading(value)),

    searchQuery: useSelector(selectSearchQuery),
    setSearchQuery: (value) => dispatch(setSearchQuery(value)),
  };
}
