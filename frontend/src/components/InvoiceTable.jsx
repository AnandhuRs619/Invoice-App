import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'invoiceNumber', headerName: 'Invoice No', width: 140 },
  { field: 'currentDate', headerName: 'Date', width: 140 },
  { field: 'customerName', headerName: 'Customer Name', width: 130 },
  { field: 'totalPrice', headerName: 'Total', type: 'number', width: 260 },
  { field: 'totalTax', headerName: 'Tax', type: 'number', width: 130 },
  { field: 'grandTotal', headerName: 'Grand Total', type: 'number', width: 130 },
];

export default function InvoiceTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Retrieve data from local storage
    const storedInvoices = JSON.parse(localStorage.getItem('invoices')) || [];

    // If there are no invoices, set rows state to an empty array
    if (storedInvoices.length === 0) {
      setRows([]);
    } else {
      // If there are invoices, map them to fit the columns format
      const formattedRows = storedInvoices.map((invoice, index) => ({
        id: index + 1,
        ...invoice,
      }));

      // Set the rows state with the formatted invoices
      setRows(formattedRows);
    }
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      {rows.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>No data available. Add some invoices to display.</p>
        </div>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
  
        />
      )}
    </div>
  );
}
