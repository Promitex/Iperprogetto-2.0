import React, { useEffect } from 'react';
import SidebarFiltri from './SidebarFiltri';
import ToggleItem from './ToggleItem';
import ToggleItemCampania from './ToggleItemCampania';
import SidebarFiltriCampania from './SidebarFiltriCampania';
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
import { useAppState } from '../features/appState/useAppState';
import SearchBar from './SearchBar';

export default function PrezziarioCampania() {
  const {
    categoria, setCategoria,
    tipologia, setTipologia,
    sottoTipologia, setSottoTipologia,
    voceSelezionata, setVoceSelezionata,
    data, setData,
    loading, setLoading,
    searchQuery, setSearchQuery
  } = useAppState();


  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/test/getcampania')
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

  const parsed = data
    .map(item => item?.col0?.replace(/^CAM25_/, ''))
    .filter(Boolean)
    .map(codice => {
      const [categoria, tipologia, sottoTipologia] = codice.split('.');
      return { categoria, tipologia, sottoTipologia };
    });


  const categorie = Array.from(new Set(parsed.map(p => p.categoria).filter(Boolean)));


  const tipologie = categoria ? Array.from(
    new Set(parsed
      .filter(p => p.categoria === categoria)
      .map(p => p.tipologia)
      .filter(Boolean))
  ) : [];


  const sottoTipologie = categoria && tipologia ? Array.from(
    new Set(parsed
      .filter(p => p.categoria === categoria && p.tipologia === tipologia)
      .map(p => p.sottoTipologia)
      .filter(Boolean))
  ) : [];


  const datiFiltrati = data.filter(item => {
    if (!categoria) return false;

    // Puliamo CAM25_ dal codice
    const codicePulito = item.col0?.replace(/^CAM25_/, '');
    if (!codicePulito) return false;

    const parts = codicePulito.split('.');
    if (parts.length < 1) return false;

    if (sottoTipologia) {
      return (
        parts[0] === categoria &&
        parts[1] === tipologia &&
        parts[2] === sottoTipologia
      );
    }

    if (tipologia) {
      return (
        parts[0] === categoria &&
        parts[1] === tipologia
      );
    }

    return parts[0] === categoria;
  });

  return (

    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <SearchBar data={data} />
      <Box sx={{ display: 'flex' }}>
        <SidebarFiltriCampania tipo="categoria" categorie={categorie} />
        {categoria && <SidebarFiltriCampania tipo="tipologia" categorie={tipologie} />}
        {categoria && tipologia && (
          <SidebarFiltriCampania tipo="sottoTipologia" categorie={sottoTipologie} />
        )}

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
    // Per ogni categoria (codice col0 a 1 livello)
    Array.from(
      new Map(
        datiFiltrati
          .filter(item => item.col0)
          .map(item => {
            const code = item.col0.replace(/^CAM25_/, '');
            const key = code.split('.').slice(0, 1).join('.');
            return [key, item];
          })
      ).values()
    ).map((item, index) => {
      const code = item.col0.replace(/^CAM25_/, '');
      return (
        <ToggleItemCampania
          key={code}
          current={code}
          currentItem={item}
          data={data}
          livello={0}
        />
      );
    })
  )}
</Box>

      </Box>
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
          {Array.isArray(voceSelezionata) && voceSelezionata.length > 0 ? (
            voceSelezionata.map((voce, idx) => (
              <Box key={idx} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  {voce.codice}
                </Typography>
                <Typography variant="body2"><strong>Descrizione:</strong> {voce.descrizione}</Typography>
                <Typography variant="body2"><strong>Prezzo senza SG:</strong> {voce.prezzoSenzaSG} €</Typography>
                <Typography variant="body2"><strong>Prezzo con SG:</strong> {voce.prezzoConSG} €</Typography>
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
