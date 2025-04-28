import React, { useEffect, useState } from 'react';
import './App.css';
import PrezziarioPiemonte from './components/PrezzarioPiemonte';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ItalyRegionsMap from './components/ItalyRegionsMap';
import PrezzarioLazio from './components/PrezzarioLazio';
function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ItalyRegionsMap />} />
      <Route path="/prezzario/piemonte" element={<PrezziarioPiemonte />} />
      <Route path="/prezzario/lazio" element={<PrezzarioLazio />} />
      {/* Altri Route per regioni */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
