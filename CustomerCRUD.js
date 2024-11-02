import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerCRUD = () => {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phoneNumber: '', password: '' });
    const [editCustomer, setEditCustomer] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/customers')
            .then(response => setCustomers(response.data))
            .catch(error => console.error('Error fetching customers:', error));
    }, []);

    const handleAddCustomer = () => {
        axios.post('http://localhost:8080/api/customers', newCustomer)
            .then(response => {
                setCustomers([...customers, response.data]);
                setNewCustomer({ name: '', email: '', phoneNumber: '', password: '' });
            })
            .catch(error => console.error('Error adding customer:', error));
    };

    const handleEditCustomer = (customer) => {
        setEditCustomer(customer);
    };

    const handleUpdateCustomer = () => {
        axios.put(`http://localhost:8080/api/customers/${editCustomer.id}`, editCustomer)
            .then(response => {
                setCustomers(customers.map(customer => customer.id === response.data.id ? response.data : customer));
                setEditCustomer(null);
            })
            .catch(error => console.error('Error updating customer:', error));
    };

    const handleDeleteCustomer = (id) => {
        axios.delete(`http://localhost:8080/api/customers/${id}`)
            .then(() => setCustomers(customers.filter(customer => customer.id !== id)))
            .catch(error => console.error('Error deleting customer:', error));
    };

    return (
        <div>
            <h3>Add New Customer</h3>
            <input
                type="text"
                placeholder="Name"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
            />
            <input
                type="text"
                placeholder="Phone Number"
                value={newCustomer.phoneNumber}
                onChange={(e) => setNewCustomer({ ...newCustomer, phoneNumber: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={newCustomer.password}
                onChange={(e) => setNewCustomer({ ...newCustomer, password: e.target.value })}
            />
            <button onClick={handleAddCustomer}>Add Customer</button>

            {editCustomer && (
                <div>
                    <h3>Edit Customer</h3>
                    <input
                        type="text"
                        value={editCustomer.name}
                        onChange={(e) => setEditCustomer({ ...editCustomer, name: e.target.value })}
                    />
                    <input
                        type="email"
                        value={editCustomer.email}
                        onChange={(e) => setEditCustomer({ ...editCustomer, email: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editCustomer.phoneNumber}
                        onChange={(e) => setEditCustomer({ ...editCustomer, phoneNumber: e.target.value })}
                    />
                    <input
                        type="password"
                        value={editCustomer.password}
                        onChange={(e) => setEditCustomer({ ...editCustomer, password: e.target.value })}
                    />
                    <button onClick={handleUpdateCustomer}>Update Customer</button>
                </div>
            )}

            <h3>Customer List</h3>
            <ul>
                {customers.map(customer => (
                    <li key={customer.id}>
                        {customer.name} - {customer.email}
                        <button onClick={() => handleEditCustomer(customer)}>Edit</button>
                        <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerCRUD;
