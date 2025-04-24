import React, { useEffect, useState } from 'react';
import SidebarFiltri from './SidebarFiltri';
import ToggleItem from './ToggleItem';
import {
  Box,
  Container,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';

export default function PrezziarioPiemonte() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categoria, setCategoria] = useState(null);        // A00
  const [tipologia, setTipologia] = useState(null);        // A00.010
  const [sottoTipologia, setSottoTipologia] = useState(null); // A00.010.001
  const [voceSelezionata, setVoceSelezionata] = useState(null); // array di voci finali

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

  const categorie = Array.from(new Set(
    data
      .filter(item => item.col1 === item.col0 && !item.col1.includes('.'))
      .map(item => item.col0)
  ));

  const tipologie = categoria
    ? Array.from(new Set(
        data
          .filter(item =>
            item.col1?.startsWith(`${categoria}.`) &&
            item.col1.split('.').length === 2
          )
          .map(item => item.col1.split('.')[1])
      ))
    : [];

  const sottoTipologie = categoria && tipologia
    ? Array.from(new Set(
        data
          .filter(item =>
            item.col1?.startsWith(`${categoria}.${tipologia}.`) &&
            item.col1.split('.').length === 3
          )
          .map(item => item.col1.split('.')[2])
      ))
    : [];

  const datiFiltrati = data.filter(item => {
    if (!categoria) return false;

    const codice = item.col1;
    if (sottoTipologia) {
      return codice === `${categoria}.${tipologia}.${sottoTipologia}`;
    }
    if (tipologia) {
      return codice === `${categoria}.${tipologia}`;
    }
    return item.col0 === categoria && item.col1 === item.col0;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex' }}>
        {/* Sidebar categorie */}
        <SidebarFiltri
          categorie={categorie}
          selected={categoria}
          onSelect={(cat) => {
            setCategoria(cat);
            setTipologia(null);
            setSottoTipologia(null);
            setVoceSelezionata(null);
          }}
        />

        {/* Sidebar tipologie */}
        {categoria && (
          <SidebarFiltri
            categorie={tipologie}
            selected={tipologia}
            onSelect={(tip) => {
              setTipologia(tip);
              setSottoTipologia(null);
              setVoceSelezionata(null);
            }}
          />
        )}

        {/* Sidebar sotto-tipologie */}
        {tipologia && (
          <SidebarFiltri
            categorie={sottoTipologie}
            selected={sottoTipologia}
            onSelect={(sub) => {
              setSottoTipologia(sub);
              const foglie = data.filter(item =>
                item.col1?.startsWith(`${categoria}.${tipologia}.${sub}.`) &&
                item.col1.split('.').length === 4
              );
              setVoceSelezionata(foglie.length > 0 ? foglie : null);
            }}
          />
        )}

        {/* Lista principale */}
        <Box sx={{ flexGrow: 1, pl: 4 }}>
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
            datiFiltrati.map((item, index) => (
              <ToggleItem
                key={`${item.col1}-${index}`}
                current={item.col1}
                label={item.col2}
                data={data}
                onApriVoci={(voci) => setVoceSelezionata(voci)}
              />
            ))
          )}
        </Box>
      </Box>

      {/* Dialog per mostrare le voci foglia */}
      <Dialog
        open={Boolean(voceSelezionata)}
        onClose={() => setVoceSelezionata(null)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ backgroundColor: '#9dbebc', color: 'white' }}>
          Dettaglio voce selezionata
        </DialogTitle>

        <DialogContent dividers sx={{ backgroundColor: '#f9f9f9' }}>
          {Array.isArray(voceSelezionata) ? (
            voceSelezionata.map((voce, idx) => (
              <Box key={idx} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  {voce.col1}
                </Typography>
                <Typography variant="body2"><strong>Descrizione:</strong> {voce.col2}</Typography>
                <Typography variant="body2"><strong>Unità:</strong> {voce.col3}</Typography>
                <Typography variant="body2"><strong>Quantità:</strong> {voce.col4}</Typography>
                <Typography variant="body2"><strong>Prezzo:</strong> {voce.col5}</Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2">Nessuna voce disponibile</Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ backgroundColor: '#f0f0f0' }}>
          <Button onClick={() => setVoceSelezionata(null)} color="primary">
            Chiudi
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
