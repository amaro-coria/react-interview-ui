// src/components/WidgetList/index.tsx

import React, { useEffect, useState, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import WidgetDisplay from '../WidgetDisplay';
import WidgetForm from '../WidgetForm';
import {
  fetchAllWidgets,
  createWidget,
  updateWidget,
  deleteWidget,
  Widget
} from '../../lib/apiConnect';

const WidgetList = (): JSX.Element => {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [editingWidget, setEditingWidget] = useState<Widget | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
    open: boolean;
  }>({ message: '', type: 'success', open: false });

  const loadWidgets = useCallback(async () => {
    try {
      const data = await fetchAllWidgets();
      setWidgets(data);
    } catch (error) {
      console.error('Error fetching widgets', error);
    }
  }, []);

  useEffect(() => {
    loadWidgets();
  }, [loadWidgets]);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type, open: true });
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const handleEdit = (widget: Widget) => {
    setEditingWidget(widget);
    setIsFormOpen(true);
  };

  const handleDelete = async (name: string) => {
    try {
      await deleteWidget(name);
      await loadWidgets();
      showNotification('Widget deleted successfully', 'success');
    } catch (error) {
      showNotification('Error deleting widget', 'error');
    }
  };

  const handleFormSubmit = async (widgetData: Widget) => {
    try {
      if (editingWidget) {
        await updateWidget(editingWidget.name, widgetData.description, widgetData.price);
        showNotification('Widget updated successfully', 'success');
      } else {
        await createWidget(widgetData);
        showNotification('Widget created successfully', 'success');
      }
      setIsFormOpen(false);
      setEditingWidget(null);
      await loadWidgets();
    } catch (error) {
      showNotification(
        `Error ${editingWidget ? 'updating' : 'creating'} widget`,
        'error'
      );
    }
  };

  return (
    <Stack spacing={4} sx={{ margin: 'auto', maxWidth: 900, paddingTop: '4em', width: '100%' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 4 }}
      >
        <Typography variant="h3">
          List of widgets:
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setEditingWidget(null);
            setIsFormOpen(true);
          }}
        >
          Add Widget
        </Button>
      </Stack>
      
      <Grid container justifyContent="center" spacing={4} sx={{ px: 4, width: '100%' }}>
        {widgets.map((widget) => (
          <WidgetDisplay
            key={widget.name}
            widget={widget}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </Grid>

      <WidgetForm
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingWidget(null);
        }}
        onSubmit={handleFormSubmit}
        editingWidget={editingWidget}
      />

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.type}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default WidgetList;