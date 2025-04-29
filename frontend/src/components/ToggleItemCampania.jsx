import React, { useState, useEffect, use } from 'react';
import { Box, Typography, IconButton, Grid } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useAppState } from '../features/appState/useAppState';
import VoceBox from './VoceBox';

export default function ToggleItemCampania({ current, currentItem, data = [], livello = 0 }) {

  const [visible, setVisible] = useState(false);
  const {
    categoria,
    tipologia,
    sottoTipologia,
    setVoceSelezionata
  } = useAppState();

  const currentParts = current.split('.');

  const label = 'ciao'
  const parsed = data
  .map(item => item?.col0?.replace(/^CAM25_/, ''))
  .filter(Boolean)
  .map(codice => {
    const [categoria, tipologia, sottoTipologia] = codice.split('.');
    return { categoria, tipologia, sottoTipologia };
  });
  
  console.log(currentItem.col0, 'data')




  // Estrai figli raggruppati per valore univoco
  const children = Array.from(
    new Map(
      data
        .filter(item => {
          const parts = item.col0?.replace(/^CAM25_/, '').split('.') || [];
          return (
            parts.length > livello &&
            parts.slice(0, currentParts.length).join('.') === current
          );
        })
        .map(item => {
          const parts = item.col0?.replace(/^CAM25_/, '').split('.') || [];
          const nextCode = parts.slice(0, currentParts.length + 1).join('.');
          return [nextCode, item]; // Map usa il codice come chiave
        })
    ).values()
  );

  // Foglie (dettagli)
  const foglie = data.filter(item => {
    const parts = item.col0?.replace(/^CAM25_/, '').split('.') || [];
    return (
      parts.length === 4 &&
      parts.slice(0, 3).join('.') === current
    );
  });

  const targetCodice = [categoria, tipologia, sottoTipologia].filter(Boolean).join('.');

  useEffect(() => {
    if (current === targetCodice) {
      setVisible(true);
    }
  }, [current, targetCodice]);

  const handleToggle = () => {
    if (foglie.length > 0 && children.length === 0) {
      setVoceSelezionata(foglie.map(f => ({
        codice: f.col0,
        descrizione: f.col5,
        prezzoSenzaSG: f.col7,
        prezzoConSG: f.col8
      })));
    } else {
      setVisible(prev => !prev);
    }
  };

  return (
    <Box sx={{ ml: livello === 0 ? 0 : 2, mb: 1 }}>
      <Box
        onClick={handleToggle}
        sx={{
          py: 2,
          px: 2,
          backgroundColor: livello % 2 === 0 ? '#ffffff' : '#f9f9f9',
          borderBottom: '1px solid #ddd',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          '&:hover': { backgroundColor: '#f0f0f0' },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography sx={{ fontWeight: 500, textTransform: 'uppercase', fontSize: '0.8rem', color: '#555' }}>
            {label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            CAM25_{current}
          </Typography>
        </Box>
        <Grid container alignItems="center" justifyContent="flex-end" sx={{ width: 'auto' }}>
          <Typography sx={{ mr: 2 }}>2024</Typography>
          <IconButton size="small">
            <BookmarkBorderIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Box>

      {/* Figli */}
      {visible && children.length > 0 && (
        <Box sx={{ pl: 2, backgroundColor: '#f9f9f9' }}>
          {children.map((child, idx) => {
            const parts = child.col0?.replace(/^CAM25_/, '').split('.') || [];
            const nextCode = parts.slice(0, livello + 1).join('.');
            return (
              <ToggleItemCampania
                key={nextCode}
                current={nextCode}
                data={data}
                livello={livello + 1}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
}
