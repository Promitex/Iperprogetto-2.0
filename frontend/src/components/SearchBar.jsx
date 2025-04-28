import React, { useEffect, useMemo } from 'react';
import { Box, TextField, Typography, CircularProgress } from '@mui/material';
import VoceBox from './VoceBox';
import { useAppState } from '../features/appState/useAppState'; // correggi il path se serve!

export default function SearchBar({ data = [] }) {
  const {
    searchQuery,
    setSearchQuery,
    setCategoria,
    setTipologia,
    setSottoTipologia,
    setVoceSelezionata,
    loading,
    setLoading
  } = useAppState();

  // Calcola i risultati dinamicamente quando cambia query o data
  const results = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();

    return data.filter(item =>
      [item.col1, item.col2, item.col3, item.col4].some(field =>
        field?.toLowerCase().includes(q)
      )
    ).slice(0, 50);
  }, [searchQuery, data]);

  // Simula un loading finto solo per effetto debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, setLoading]);

  // Quando selezioni una voce, aggiorni lo stato globale
  const handleSelectVoce = (voce) => {
    const parts = voce.col1?.split('.') || [];

    if (parts.length >= 4) {
      setCategoria(parts[0]);
      setTipologia(parts[1]);
      setSottoTipologia(parts[2]);

      const codicePrefix = parts.slice(0, 3).join('.') + '.';
      const foglie = data.filter(item =>
        item.col1?.startsWith(codicePrefix) &&
        item.col1.split('.').length === 4
      );

      setVoceSelezionata(foglie);
    }
  };

  return (
    <Box sx={{ my: 4 }}>
      <TextField
        fullWidth
        label="Cerca voce"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Cerca per codice, descrizione, unità o prezzo..."
        sx={{ mb: 3 }}
      />

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}

      {!loading && searchQuery && results.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          Nessun risultato trovato.
        </Typography>
      )}

      {results.map((voce, idx) => (
        <Box
          key={idx}
          onClick={() => handleSelectVoce(voce)}
          sx={{ cursor: 'pointer' }}
        >
          <VoceBox voce={voce} />
        </Box>
      ))}
    </Box>
  );
}
