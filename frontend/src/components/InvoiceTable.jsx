import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "invoiceNumber", headerName: "Invoice No", width: 140 },
  { field: "currentDate", headerName: "Date", width: 140 },
  { field: "customerName", headerName: "Customer Name", width: 240 },
  { field: "totalPrice", headerName: "Total", type: "number", width: 250 },
  { field: "totalTax", headerName: "Tax", type: "number", width: 130 },
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

  useEffect(() => {
    const storedInvoices =
      JSON.parse(localStorage.getItem("invoices")) || [];

    if (storedInvoices.length === 0) {
      setRows([]);
    } else {
      const formattedRows = storedInvoices.map((invoice, index) => ({
        id: index + 1,
        ...invoice,
      }));

      setRows(formattedRows);
    }
  }, []);

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      // eslint-disable-next-line react/prop-types
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div style={{ height: 400, width: "100%" }}>
      {filteredRows.length === 0 ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <p>No data available. Add some invoices to display.</p>
        </div>
      ) : (
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      )}
    </div>
  );
}
