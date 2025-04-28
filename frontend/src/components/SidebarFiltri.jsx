import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useAppState } from '../features/appState/useAppState'; // correggi il path se necessario!

export default function SidebarFiltri({ categorie, tipo, data = [] }) {
  const {
    categoria, setCategoria,
    tipologia, setTipologia,
    sottoTipologia, setSottoTipologia,
    setVoceSelezionata,
  } = useAppState();

  useEffect(() => {
    setCategoria("01");
  }, [setCategoria]);

  const selected = tipo === 'categoria' ? categoria
    : tipo === 'tipologia' ? tipologia
    : tipo === 'sottoTipologia' ? sottoTipologia
    : null;

  const handleSelect = (val) => {
    if (tipo === 'categoria') {
      setCategoria(val);
      setTipologia(null);
      setSottoTipologia(null);
      setVoceSelezionata(null);
    } else if (tipo === 'tipologia') {
      setTipologia(val);
      setSottoTipologia(null);
      setVoceSelezionata(null);
    } else if (tipo === 'sottoTipologia') {
      setSottoTipologia(val);

      // Trova voci foglia
      const prefix = `${categoria}.${tipologia}.${val}.`;
      const voci = data.filter(item =>
        item.col1?.startsWith(prefix) &&
        item.col1.split('.').length === 4
      );
      setVoceSelezionata(voci.length > 0 ? voci : null);
    }
  };

  return (
    <Box sx={{
      width: 120,
      backgroundColor: '#f5f5f5',
      borderRight: '1px solid #ccc',
      px: 1,
      py: 2,
      height: '100%',
      overflowY: 'auto',
    }}>
      <Typography
        variant="caption"
        sx={{
          fontWeight: 700,
          color: '#9dbebc',
          textTransform: 'uppercase',
          mb: 2,
          pl: 1
        }}
      >
        {tipo}
      </Typography>

      {categorie.map((cat, index) => (
        <Button
          key={index}
          onClick={() => handleSelect(cat)}
          variant={selected === cat ? 'contained' : 'text'}
          fullWidth
          sx={{
            justifyContent: 'flex-start',
            textTransform: 'uppercase',
            color: selected === cat ? '#fff' : '#9dbebc',
            backgroundColor: selected === cat ? '#9dbebc' : 'transparent',
            fontWeight: 500,
            fontSize: '0.75rem',
            px: 2,
            py: 1,
            mb: 0.5,
            borderRadius: 1,
            '&:hover': {
              backgroundColor: selected === cat ? '#86aaa9' : '#e0e0e0',
            },
          }}
        >
          {cat}
        </Button>
      ))}
    </Box>
  );
}
