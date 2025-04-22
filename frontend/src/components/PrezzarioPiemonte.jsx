import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react'; // opzionale, se vuoi usare icone fighe

export default function PrezziarioPiemonte() {
  const [col0List, setCol0List] = useState([]);
  const [expandedCol0, setExpandedCol0] = useState(null);
  const [col1Map, setCol1Map] = useState({});
  const [expandedCol1, setExpandedCol1] = useState(null);
  const [col2Map, setCol2Map] = useState({});

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/test/col0')
      .then(res => res.json())
      .then(setCol0List);
  }, []);

  const toggleCol0 = (col0) => {
    setExpandedCol0(col0 === expandedCol0 ? null : col0);
    if (!col1Map[col0]) {
      fetch(`http://127.0.0.1:8000/api/test/col1/${col0}`)
        .then(res => res.json())
        .then(data => setCol1Map(prev => ({ ...prev, [col0]: data })));
    }
  };

  const toggleCol1 = (col0, col1) => {
    const key = `${col0}-${col1}`;
    setExpandedCol1(key === expandedCol1 ? null : key);
    if (!col2Map[key]) {
      fetch(`http://127.0.0.1:8000/api/test/col2/${col0}/${col1}`)
        .then(res => res.json())
        .then(data => setCol2Map(prev => ({ ...prev, [key]: data })));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Prezziario Piemonte</h2>
      {col0List.map((col0) => (
        <div key={col0} className="mb-4 border-b border-gray-200">
          <button
            onClick={() => toggleCol0(col0)}
            className="w-full flex items-center justify-between text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-md transition"
          >
            <span className="font-medium text-gray-800">{col0}</span>
            <span>
              {expandedCol0 === col0 ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </span>
          </button>

          {expandedCol0 === col0 && col1Map[col0] && (
            <div className="pl-6 mt-2 space-y-2">
              {col1Map[col0].map((col1) => {
                const key = `${col0}-${col1}`;
                return (
                  <div key={key}>
                    <button
                      onClick={() => toggleCol1(col0, col1)}
                      className="w-full flex items-center justify-between text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md text-sm text-gray-700 transition"
                    >
                      <span>{col1}</span>
                      <span>
                        {expandedCol1 === key ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </span>
                    </button>

                    {expandedCol1 === key && col2Map[key] && (
                      <div className="pl-6 mt-2 space-y-2">
                        {col2Map[key].map((item, idx) => (
                          <div key={idx} className="bg-white p-4 border border-gray-200 rounded shadow-sm">
                            <p className="font-semibold text-gray-800">{item.col3}</p>
                            <p className="text-gray-600">{item.col4}</p>
                            <p className="text-sm text-gray-500 mt-1">Prezzo: {item.col9}</p>
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
