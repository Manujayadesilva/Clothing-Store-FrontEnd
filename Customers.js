import React, { useState, useEffect } from "react";
import axios from "axios";

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({ name: "", email: "", phoneNumber: "" });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        const response = await axios.get("http://localhost:8080/api/customers");
        setCustomers(response.data);
    };

    const handleInputChange = (e) => {
        setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
    };

    const handleAddCustomer = async () => {
        await axios.post("http://localhost:8080/api/customers", newCustomer);
        fetchCustomers();
    };

    const handleDeleteCustomer = async (id) => {
        await axios.delete('http://localhost:8080/api/customers/${id}');
        fetchCustomers();
    };

    return (
        <div className="container">
            <h2>Customers</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer) => (
                    <tr key={customer.id}>
                        <td>{customer.name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phoneNumber}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h4>Add New Customer</h4>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={newCustomer.name}
                onChange={handleInputChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={newCustomer.email}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={newCustomer.phoneNumber}
                onChange={handleInputChange}
            />
            <button className="btn btn-primary" onClick={handleAddCustomer}>Add Customer</button>
        </div>
    );
};

export default Customers;