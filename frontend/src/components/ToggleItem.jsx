import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Grid
} from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

export default function ToggleItem({ current, label, data = [], livello = 0 }) {
  const [visible, setVisible] = useState(false);

  const currentParts = current.split('.');

  // Filtra figli diretti
  const children = data.filter(item => {
    const parts = item.col1?.split('.') || [];
    if (parts.length !== currentParts.length + 1) return false;
    return parts.slice(0, currentParts.length).join('.') === current;
  });

  const handleToggle = () => setVisible(prev => !prev);

  return (
    <Box sx={{ ml: livello === 0 ? 0 : 2, mb: 0.5 }}>
      {/* RIGA PRINCIPALE */}
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
    alignItems: 'flex-start', // meglio "center" qui
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  }}
>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography sx={{ fontWeight: 500, textAlign:'start', textTransform: 'uppercase', display:'flex', justifyContent:'flex-start', fontSize: '0.8rem', color: '#555' }}>
            {label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {current} 
          </Typography>
        </Box>

        <Grid container alignItems="flex-end" justifyContent="flex-end" sx={{ width: 'auto' }}>
          <Typography sx={{ mr: 2 }}>2024</Typography>
          <IconButton size="small">
            <BookmarkBorderIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Box>

      {/* SOTTOELEMENTI */}
      {visible && children.length > 0 && (
        <Box sx={{ pl: 2, backgroundColor: '#f9f9f9', justifyContent:'flex-end' }}>
          {children.map((child, idx) => (
            <ToggleItem
              key={`${child.col1}-${idx}`}
              current={child.col1}
              label={child.col2}
              data={data}
              livello={livello + 1}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

