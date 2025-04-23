import React, { useEffect, useState } from 'react';
import ToggleItem from './ToggleItem';
import { Container, Typography, Skeleton, Box } from '@mui/material';

export default function PrezziarioPiemonte() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/test/col0')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ backgroundColor: '#9dbebc', color: '#fff', p: 2, borderRadius: 1, mb: 2 }}>
        <Typography variant="h6">
          Prezzario Piemonte
        </Typography>
      </Box>

      {loading ? (
        [...Array(5)].map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={60}
            sx={{ mb: 2, borderRadius: 1 }}
          />
        ))
      ) : (
        data
          .filter(item => item.col0 === item.col1 && !item.col1.includes('.'))
          .map((item, index) => (
            <ToggleItem
              key={`${item.col1}-${index}`}
              current={item.col1}
              label={item.col2}
              data={data}
            />
          ))
      )}
    </Container>
  );
}
