import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionItem({ col0, col2, data = [] }) {
  const [expanded, setExpanded] = useState(false);
  const [tipologia, setTipologia] = useState(null);

  const handleChange = () => {
    setExpanded(prev => !prev);
    console.log(tipologia);
  };

  const filteredItems = data.filter(item => {
    const parts = item.col1?.split('.') || [];
    return parts.length === 2 && parts[0] === col0;
  });

  useEffect(() => {
    if (expanded && filteredItems.length > 0) {
      setTipologia(filteredItems[0].col1);
    }
  }, [expanded, filteredItems]);

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${col0}-content`}
        id={`panel-${col0}-header`}
      >
        <Typography>{col0} - {col2}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {filteredItems.length > 0 ? (
          <List dense>
            {filteredItems.map((item, idx) => (
              <ListItem key={idx}>
                <ListItemText
                  primary={`col1: ${item.col1}`}
                  secondary={`col2: ${item.col2}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Nessun dato corrispondente.
          </Typography>
        )}

        {tipologia && (
          <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
            Tipologia selezionata: {tipologia}
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
