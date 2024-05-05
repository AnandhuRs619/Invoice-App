import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Grid from '@mui/material/Grid';
import AddItemModal from './AddItemModal';


const CreateInvoiceModal = ({ open, onClose }) => {
  const [invoiceNumber, setInvoiceNumber] = useState(1000);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [items, setItems] = useState([]);
  const [openAddItemModal, setOpenAddItemModal] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    calculateTotals();
  }, [items]);

  const calculateTotals = () => {
    let totalPrice = 0;
    let totalTax = 0;

    items.forEach((item) => {
      const taxAmount = (item.price * item.tax) / 100;
      totalPrice += item.price;
      totalTax += taxAmount;
    });

    setTotalPrice(totalPrice);
    setTotalTax(totalTax);
    setGrandTotal(totalPrice + totalTax);
  };

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
   
    localStorage.setItem('items', JSON.stringify([...items, newItem]));
  };

 
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items'));
    if (storedItems) {
      setItems(storedItems);
    }
  }, []);

  const clearLocalStorage = () => {
    localStorage.removeItem('items');
    setItems([]);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Create New Invoice</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Invoice Number"
              value={invoiceNumber}
              disabled
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Current Date"
              value={currentDate.toLocaleDateString()}
              disabled
              margin="normal"
            />
          </Grid>
        </Grid>
        <Button
          variant="outlined"
          onClick={() => setOpenAddItemModal(true)}
          sx={{ float: 'right', mb: 2, mt: 2 }}
        >
          Add Item
        </Button>
        <TableContainer component={Paper} style={{ marginTop: 20 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item ID</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Tax</TableCell>
                <TableCell>Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {items.length === 0 ? (
    <TableRow>
      <TableCell colSpan={5} align="center">No items added yet</TableCell>
    </TableRow>
  ) : (
    items.map((item) => (
      <TableRow key={item.id}>
        <TableCell>{item.id}</TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.price}</TableCell>
        <TableCell>{item.tax}%</TableCell>
        <TableCell>{(item.price * (1 + item.tax / 100)).toFixed(2)}</TableCell>
      </TableRow>
    ))
  )}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid
          container
          spacing={1}
          direction={"column"}
          alignItems="flex-end"
          justifyContent="flex-end"
          style={{ marginTop: 20 }}
        >
          <Grid item xs={4}>
            <TextField label="Total Price" value={totalPrice.toFixed(2)} disabled margin="normal" />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Total Tax" value={totalTax.toFixed(2)} disabled margin="normal" />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Grand Total" value={grandTotal.toFixed(2)} disabled margin="normal" />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={clearLocalStorage} color="secondary">Clear Local Storage</Button>
      </DialogActions>
      
      <AddItemModal open={openAddItemModal} onClose={() => setOpenAddItemModal(false)} onAddItem={handleAddItem} />
    </Dialog>
  );
};

export default CreateInvoiceModal;
