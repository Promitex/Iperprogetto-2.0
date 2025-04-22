import React, { useEffect, useState } from 'react';

export default function PrezziarioPiemonte() {
  const [col0List, setCol0List] = useState([]);
  const [expandedCol0, setExpandedCol0] = useState(null);
  const [col1Map, setCol1Map] = useState({});
  const [expandedCol1, setExpandedCol1] = useState(null);
  const [col2Map, setCol2Map] = useState({});

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/piemonte/col0')
      .then(res => res.json())
      .then(setCol0List);
  }, []);

  const toggleCol0 = (col0) => {
    setExpandedCol0(col0 === expandedCol0 ? null : col0);
    if (!col1Map[col0]) {
      fetch(`http://127.0.0.1:8000/api/piemonte/col1/${col0}`)
        .then(res => res.json())
        .then(data => setCol1Map(prev => ({ ...prev, [col0]: data })));
    }
  };


  const toggleCol1 = (col0, col1) => {
    const key = `${col0}-${col1}`;
    setExpandedCol1(key === expandedCol1 ? null : key);
    if (!col2Map[key]) {
      fetch(`http://127.0.0.1:8000/api/piemonte/col2/${col0}/${col1}`)
        .then(res => res.json())
        .then(data => setCol2Map(prev => ({ ...prev, [key]: data })));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Prezziario Piemonte</h2>
      {col0List.map(col0 => (
        <div key={col0} className="mb-2">
          <button
            onClick={() => toggleCol0(col0)}
            className="bg-blue-200 w-full text-left px-4 py-2 rounded shadow"
          >
            {col0}
          </button>

          {expandedCol0 === col0 && col1Map[col0] && (
            <div className="ml-4 mt-2">
              {col1Map[col0].map(col1 => {
                const key = `${col0}-${col1}`;
                return (
                  <div key={key} className="mb-1">
                    <button
                      onClick={() => toggleCol1(col0, col1)}
                      className="bg-blue-100 w-full text-left px-4 py-1 rounded"
                    >
                      {col1}
                    </button>

                    {expandedCol1 === key && col2Map[key] && (
                      <div className="ml-4 mt-2">
                        {col2Map[key].map((item, idx) => (
                          <div key={idx} className="border border-gray-200 rounded p-2 mb-1 bg-white">
                            <p className="font-semibold">{item.col3}</p>
                            <p>{item.col4}</p>
                            <p className="text-sm text-gray-500">Prezzo: {item.col9}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
