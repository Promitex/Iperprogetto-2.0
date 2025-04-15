import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/test')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setMessage(data.message);
      })
      .catch(err => {
        console.error('Errore nella fetch:', err);
        setMessage('Errore nella comunicazione con Laravel.');
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {/* 👇 Output del messaggio da Laravel */}
        <p style={{ marginTop: '2rem', color: '#61dafb' }}>
          Messaggio da Laravel: {message}
        </p>
      </header>
    </div>
  );
}

export default App;
