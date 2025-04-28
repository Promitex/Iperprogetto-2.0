import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { ReactComponent as ItalyMap } from './italy.svg'; 
import { styled } from '@mui/system';

const StyledMapWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '600px',
  margin: '0 auto',
  '& svg': {
    width: '100%',
    height: 'auto',
    cursor: 'pointer',
    '& circle, & path': {
      transition: 'fill 0.3s ease',
      fill: '#1D3C6E',
      stroke: 'white', 
      strokeWidth: '1',
      '&:hover': {
        fill: '#86aaa9', 
      },
    },
  },
}));

const MappaItalia = () => {
  const navigate = useNavigate();

  const handleRegionClick = (e) => {
    const regionId = e.target.getAttribute('id').toLowerCase();
    if (regionId) {
      navigate(`/prezzario/${regionId.toLowerCase()}`);
    }
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 4 }}>
      <Box sx={{ mb: 2 }}>
        <img 
          src="./logo-iperprogetto.png" 
          alt="Iperprogetto" 
          style={{ width: '350px', height: 'auto', marginBottom: '20px' }}
        />
      </Box>

      <Typography variant="h4" component="h2" gutterBottom>
        Accedi al prezzario regionale italiano
      </Typography>

      <StyledMapWrapper sx={{ mt: 4 }}>
        <ItalyMap onClick={handleRegionClick} />
      </StyledMapWrapper>
    </Container>
  );
};

export default MappaItalia;
