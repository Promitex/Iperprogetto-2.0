import React, { useEffect, useState } from 'react';
import './App.css';
import PrezziarioPiemonte from './components/PrezzarioPiemonte';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ItalyRegionsMap from './components/ItalyRegionsMap';
function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ItalyRegionsMap />} />
      <Route path="/prezzario/piemonte" element={<PrezziarioPiemonte />} />
      {/* <Route path="/prezzarioLazio" element={<PrezziarioLazio />} /> */}
      {/* Altri Route per regioni */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
