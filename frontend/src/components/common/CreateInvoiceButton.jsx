
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import CreateInvoiceModal from '../CreateinvoiceModal';

const CreateInvoiceButton = () => {
  const [modalOpen , setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <>
    
    <IconButton
      size="small"
      edge="end"
      color="inherit"
      aria-label="create invoice"
      variant="contained"
      onClick={handleOpenModal}
      sx={{
        backgroundColor: '#1a237e', 
        border: '1px solid #1a237e', 
        borderRadius: 1, 
        '&:hover': {
          backgroundColor: '#0d47a1', 
          borderColor: '#0d47a1', 
        },
      }}
    >
      <AddIcon />
      Create Invoice
    </IconButton>
    <CreateInvoiceModal open={modalOpen} onClose={handleCloseModal}/>
    </>
  );
}

export default CreateInvoiceButton;
