import React from 'react';
import {Box, Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
  } from '@mui/material';
  
export default function SidebarFiltri({ categorie, selected, onSelect, name }) {
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
          letterSpacing: '0.5px',
          mb: 2,
          pl: 1
        }}
      >
        {name}
      </Typography>

      {categorie.map((cat, index) => (
        <Button
          key={index}
          onClick={() => onSelect(cat)}
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
