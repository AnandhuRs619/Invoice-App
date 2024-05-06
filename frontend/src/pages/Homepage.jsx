
import { useState } from "react";
import InvoiceTable from "../components/InvoiceTable"
import Navbar from "../components/common/NavBar"


export const Homepage = () => {
  const [searchText, setSearchText] = useState("");
  const handleSearch = (text) => {
    setSearchText(text);
  };
  return (
    <>
    
    <Navbar onSearch={handleSearch}/>
    <InvoiceTable searchText={searchText}/>
   
    </>
  )
}
