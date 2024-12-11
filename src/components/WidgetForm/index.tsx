// components/WidgetForm/index.tsx

import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Widget } from '../../lib/apiConnect';

interface WidgetFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (widget: Widget) => void;
  editingWidget?: Widget | null;
}

const initialWidget: Widget = {
  name: '',
  description: '',
  price: 1.00
};

const WidgetForm = ({ open, onClose, onSubmit, editingWidget }: WidgetFormProps): JSX.Element => {
  const [formData, setFormData] = useState<Widget>(initialWidget);
  const [errors, setErrors] = useState<Partial<Record<keyof Widget, string>>>({});

  useEffect(() => {
    if (editingWidget) {
      setFormData(editingWidget);
    } else {
      setFormData(initialWidget);
    }
  }, [editingWidget, open]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Widget, string>> = {};

    if (formData.name.length < 3 || formData.name.length > 100) {
      newErrors.name = 'Name must be between 3 and 100 characters';
    }

    if (formData.description.length < 5 || formData.description.length > 1000) {
      newErrors.description = 'Description must be between 5 and 1000 characters';
    }

    if (formData.price < 1 || formData.price > 20000) {
      newErrors.price = 'Price must be between 1 and 20,000';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{editingWidget ? 'Edit Widget' : 'Create New Widget'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            {!editingWidget && (
              <TextField
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                required
                fullWidth
              />
            )}
            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
              required
              multiline
              rows={4}
              fullWidth
            />
            <TextField
              name="price"
              label="Price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              error={!!errors.price}
              helperText={errors.price}
              required
              inputProps={{ min: 1, max: 20000, step: 0.01 }}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {editingWidget ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default WidgetForm;