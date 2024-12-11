// components/WidgetDisplay/index.tsx

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { Widget } from '../../lib/apiConnect';

export interface DisplayWidgetProps {
  widget: Widget;
  onEdit: (widget: Widget) => void;
  onDelete: (name: string) => void;
}

const DisplayWidget = ({ widget, onEdit, onDelete }: DisplayWidgetProps): JSX.Element => {
  const { description, name, price } = widget;
  
  return (
    <Grid item xs={6}>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography component="div" gutterBottom variant="h4">
              {name}
            </Typography>
            <Typography component="div" gutterBottom variant="h5">
              ${price.toFixed(2)}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => onEdit(widget)}
              >
                Edit
              </Button>
              <Button 
                variant="contained" 
                color="error"
                onClick={() => onDelete(name)}
              >
                Delete
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default DisplayWidget;