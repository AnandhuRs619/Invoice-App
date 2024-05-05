
import  { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const AddItemModal = ({ open, onClose, onAddItem }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [tax, setTax] = useState('');

  const handleAddItem = () => {
    // Validate input
    if (!name || !price || !tax) {
      alert('Please fill in all fields.');
      return;
    }

    // Create new item object
    const newItem = {
      id: Math.floor(Math.random() * 1000), // Generate unique ID (temporary solution)
      name,
      price: parseFloat(price),
      tax: parseFloat(tax),
    };

    // Pass the new item to the parent component
    onAddItem(newItem);

    // Clear input fields
    setName('');
    setPrice('');
    setTax('');

    // Close the modal
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
        />
        <TextField
          fullWidth
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Tax (%)"
          type="number"
          value={tax}
          onChange={(e) => setTax(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddItem} color="primary">Add</Button>
        <Button onClick={onClose} color="secondary">Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemModal;
