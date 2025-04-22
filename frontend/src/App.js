import React, { useEffect, useState } from 'react';
import './App.css';
import ListinoPrezziTable from './components/ListinoPrezziTable';
import PrezziarioPiemonte from './components/PrezzarioPiemonte';


function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/test')
      .then(res => res.json())
      .then(data => {
        console.log('Dati ricevuti:', data);
        setData(data);
      })
      .catch(err => {
        console.error('Errore nella fetch:', err);
      });
  }, []);

  return (
    <div className="App">
      <ListinoPrezziTable data={data} />
      <PrezziarioPiemonte />
    </div>
  );
}

export default App;
