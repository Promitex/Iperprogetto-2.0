import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ItalyMap } from './italy.svg'; 

const MappaItalia = () => {
  const navigate = useNavigate();

  const handleRegionClick = (regionId) => {
    navigate(`/prezzario/${regionId.toLowerCase()}`);
  };

  return (
    <div>
        <h2>Accedi al prezzario regionale italiano</h2>
      <ItalyMap onClick={(e) => {
        const regionId = e.target.getAttribute('id');
        if (regionId) {
          handleRegionClick(regionId);
        }
      }} />
    </div>
  );
};

export default MappaItalia;
