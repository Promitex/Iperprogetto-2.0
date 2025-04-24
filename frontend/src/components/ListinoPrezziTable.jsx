import React from 'react';

const thStyle = {
  padding: '10px',
  border: '1px solid #444',
  textAlign: 'left'
};

const tdStyle = {
  padding: '10px',
  border: '1px solid #444'
};

const rowEven = {
  backgroundColor: '#282c34'
};

const rowOdd = {
  backgroundColor: '#1c1f25'
};

export default function ListinoPrezziTable({ data }) {
  return (
    <div>
      <h2 style={{ color: '#61dafb' }}>Listino prezzi</h2>
      <table style={{ width: '90%', margin: '2rem auto', borderCollapse: 'collapse', color: '#fff' }}>
        <thead style={{ backgroundColor: '#20232a' }}>
          <tr>
            <th style={thStyle}>Codice Articolo</th>
            <th style={thStyle}>Descrizione Breve</th>
            <th style={thStyle}>Prezzo Finale</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} style={index % 2 === 0 ? rowEven : rowOdd}>
              <td style={tdStyle}>{item[3]}</td>
              <td style={tdStyle}>{item[4]}</td>
              <td style={tdStyle}>{item[9]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
