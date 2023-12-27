import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../NavBar/Navbar';

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    fetch('http://127.0.0.1:8000/api/invoices/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((results) => {
        // Ensure results is an array before setting it in the state
        if (Array.isArray(results)) {
          setInvoices(results);
          results.forEach((element) => {
            element.totalAmount = element.items.reduce(
              (total, item) =>
                Number(total) + Number(item.rate) * Number(item.quantity),
              0
            );
          });
          console.log(invoices);
        } else {
          console.error("API response is not an array:", results);
        }
      });
  }, []);

  return (
    <div className="container">
      <Navbar />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Invoice No</th>
            <th scope="col">Client</th>
            <th scope="col">Date</th>
            <th scope="col">Total Amount</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((i) => (
            <tr key={i.invoice_id}>
              <th>{i.invoice_id}</th>
              <td>{i.client_name}</td>
              <td>{new Date(i.date).toDateString()}</td>
              <td>{i.totalAmount}</td>
              <td>
                <NavLink to={`/${i.invoice_id}`} className="btn btn-warning">
                  Items
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
