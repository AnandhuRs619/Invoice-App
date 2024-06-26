import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

const columns = [
  { field: "invoiceNumber", headerName: "Invoice No", width: 140 },
  { field: "currentDate", headerName: "Date", width: 140 },
  { field: "customerName", headerName: "Customer Name", width: 240 },
  { field: "totalPrice", headerName: "Total", type: "number", width: 250 },
  { field: "totalTax", headerName: "Tax %", type: "number", width: 130 },
  {
    field: "grandTotal",
    headerName: "Grand Total",
    type: "number",
    width: 130,
  },
];

// eslint-disable-next-line react/prop-types
export default function InvoiceTable({ searchText }) {
  const [rows, setRows] = useState([]);

  // Retrieve invoices from local storage
  useEffect(() => {
    const storedInvoices =
      JSON.parse(localStorage.getItem("invoices")) || [];

    if (storedInvoices.length === 0) {
      setRows([]);
    } else {
       // Format rows for DataGrid
      const formattedRows = storedInvoices.map((invoice, index) => ({
        id: index + 1,
        ...invoice,
      }));

      setRows(formattedRows);
    }
  }, []);
  // Filter rows based on searchText
  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      // eslint-disable-next-line react/prop-types
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div style={{ height: "100%", width: "100%", marginTop:"20px" }}>
      <h2 style={{ textAlign: "left"}}>Invoice Table</h2>
      {filteredRows.length === 0 ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <p>No data available. Add some invoices to display.</p>
        </div>
      ) : (
        <DataGrid
        
        rows={filteredRows}
          columns={columns}
          headerSlot={
            <Typography variant="h6" component="div">
              Invoice Table
            </Typography>
          }
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[ 10,25]}
  
          checkboxSelection
        />
      )}
    </div>
  );
}
