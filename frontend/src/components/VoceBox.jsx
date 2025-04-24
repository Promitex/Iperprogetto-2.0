import React from 'react';
import { Box, Typography, Grid, Button, IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

export default function VoceBox({ voce }) {
    console.log('VoceBox', voce);
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        p: 2,
        borderBottom: '1px solid #ddd',
        backgroundColor: '#f9f9f9',
        mb: 2,
      }}
    >
      {/* Sezione sinistra */}
      <Box >
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {voce.col2}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
          <Typography variant="caption" color="text.secondary">
            CAM25_{voce.col1}
          </Typography>
          <LocalOfferOutlinedIcon sx={{ fontSize: 16, ml: 1, color: '#ccc' }} />
        </Box>

        <Button
          variant="contained"
          size="small"
          disabled
          sx={{
            mt: 1,
            backgroundColor: '#eee',
            color: '#888',
            textTransform: 'none',
            fontSize: '0.7rem',
            cursor: 'default',
            '&:hover': {
              backgroundColor: '#eee'
            }
          }}
        >
          Mostra informazioni dettagliate
        </Button>
      </Box>

      {/* Sezione destra */}
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="body2">
          Prezzo <strong>{voce.col4} €/cad</strong>
        </Typography>
        {/* <Typography variant="body2">
          Prezzo senza S. G. e U. I. <strong>{Number(voce.col4).toLocaleString('it-IT', { minimumFractionDigits: 5 })} €/cad</strong>
        </Typography> */}
        <Typography variant="caption" color="text.secondary">+0,00% &nbsp; 2024</Typography>
        <IconButton size="small" sx={{ ml: 1 }}>
          <BookmarkBorderIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
