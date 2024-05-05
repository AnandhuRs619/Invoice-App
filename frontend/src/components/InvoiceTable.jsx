
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Invoice No', width: 140 },
  { field: 'customername', headerName: 'Customer Name', width: 130 },
  { field: 'total', headerName: 'Total', type: 'number', width: 260 },
  {
    field: 'tax',
    headerName: 'Tax',
    type: 'number',
    width: 130,
  },
  {
    field: 'grandtotal',
    headerName: 'Grand Total',
    type: 'number',
    width: 130,
  },

];

const rows = [
  { id: 1, customername: 'Snow', total: '1000.00', tax: '5.00',grandtotal: '1005.00' },
  { id: 2, customername: 'Lannister', total: '300',tax: '5.00', grandtotal: '1005.00' },
  { id: 3, customername: 'Lannister', total: '244',tax: '5.00', grandtotal: '1005.00' },
  { id: 4, customername: 'Stark', total: '173',tax: '5.00', grandtotal: '1005.00' },
  { id: 5, customername: 'Targaryen', total: '2432',tax: '5.00', grandtotal: '1005.00' },
  { id: 6, customername: 'Melisandre', total: null,tax: '5.00', grandtotal: '1005.00' },
  { id: 7, customername: 'Clifford', total: 'Ferrara', grandtotal: '1005.00' },
  { id: 8, customername: 'Frances', total: 'Rossini', grandtotal: '1005.00'},
  { id: 9, customername: 'Roxie', total: 'Harvey',grandtotal: '1005.00' },
];

export default function InvoiceTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
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
    </div>
  );
}
