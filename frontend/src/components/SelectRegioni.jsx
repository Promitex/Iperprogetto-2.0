import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material';

const regioniItaliane = [
  'Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna',
  'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardia', 'Marche',
  'Molise', 'Piemonte', 'Puglia', 'Sardegna', 'Sicilia',
  'Toscana', 'Trentino-Alto Adige', 'Umbria', 'Valle d\'Aosta', 'Veneto'
];

export default function SelectRegioni({ onChange }) {
  const [regione, setRegione] = useState('');

  const handleChange = (event) => {
    setRegione(event.target.value);
    onChange?.(event.target.value);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="body2" sx={{ color: '#555', mb: 1 }}>
        Seleziona una Regione
      </Typography>
      <FormControl fullWidth size="small">
        <InputLabel id="regione-label">Regione</InputLabel>
        <Select
          labelId="regione-label"
          id="select-regione"
          value={regione}
          label="Regione"
          onChange={handleChange}
          sx={{
            backgroundColor: '#fff',
            borderRadius: 1,
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}
        >
          {regioniItaliane.map((reg, idx) => (
            <MenuItem key={idx} value={reg}>
              {reg}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
