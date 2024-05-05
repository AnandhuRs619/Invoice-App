
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const CreateInvoiceButton = () => {
  return (
    <IconButton
      size="small"
      edge="end"
      color="inherit"
      aria-label="create invoice"
      variant="contained"
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
  );
}

export default CreateInvoiceButton;
