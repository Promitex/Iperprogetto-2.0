import React, { useState } from 'react';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

export default function StyledItemList({ data }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <Box sx={{ backgroundColor: '#e6f0ef', borderRadius: 1, p: 2 }}>
      {/* Breadcrumb */}
      <Typography variant="body2" sx={{ color: '#555', mb: 1 }}>
        CAM25 &gt; A00
      </Typography>

      {/* Intestazione */}
      <Box sx={{ backgroundColor: '#9dbebc', color: '#fff', p: 2, borderRadius: 1, mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          A00 RESTAURO - ANALISI PRELIMINARI, CONOSCITIVI E DOCUMENTALI
        </Typography>
      </Box>

      {/* Lista di elementi */}
      {data.map((item, idx) => (
        <Box
          key={idx}
          sx={{
            borderBottom: '1px solid #ddd',
            py: 2,
            px: 1,
            backgroundColor: idx % 2 === 1 ? '#f9f9f9' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'background 0.3s',
            '&:hover': { backgroundColor: '#f0f0f0' }
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 500 }}>{item.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {item.code}
            </Typography>
          </Box>

          <Grid container alignItems="center" justifyContent="flex-end" sx={{ width: 'auto' }}>
            <Typography sx={{ mr: 2 }}>+0,00%</Typography>
            <Typography sx={{ mr: 2 }}>2024</Typography>
            <IconButton size="small">
              <BookmarkBorderIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
