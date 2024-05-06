
import  { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import useSnackbarAlert from '../hooks/useSnackbarAlert';

// eslint-disable-next-line react/prop-types
const AddItemModal = ({ open, onClose, onAddItem }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [tax, setTax] = useState('');
  const [showAlert, SnackbarAlert] = useSnackbarAlert();

  const handleAddItem = () => {
    // Validate input
    if (!name || !price || !tax) {
      showAlert('Please fill in all fields.','error');
      return;
    }

 
    const newItem = {
      id: Math.floor(Math.random() * 1000), 
      name,
      price: parseFloat(price),
      tax: parseFloat(tax),
    };

   
    onAddItem(newItem);

  
    setName('');
    setPrice('');
    setTax('');

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Item</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Tax (%)"
          type="number"
          value={tax}
          onChange={(e) => setTax(e.target.value)}
          margin="normal"
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddItem} color="primary">Add</Button>
        <Button onClick={onClose} color="secondary">Cancel</Button>
      </DialogActions>
      {SnackbarAlert}
    </Dialog>
  );
};

export default AddItemModal;
