import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerDashboard = () => {
    const [customer, setCustomer] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchCustomerDetails();
        fetchCustomerOrders();
    }, []);

    const fetchCustomerDetails = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/customers/1");
            setCustomer(response.data);
        } catch (error) {
            console.error('Error fetching customer details:', error);
        }
    };

    const fetchCustomerOrders = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/orders");
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching customer orders:', error);
        }
    };


    const handleUpdateOrder = async (order) => {
        try {
            const updatedOrder = {
                ...order,
                orderDate: order.orderDate,
                status: order.status,
                quantity: order.quantity,
                size: order.size,
            };

            await axios.put(`http://localhost:8080/api/orders/${order.id}`, updatedOrder);
            alert('Order updated successfully!');
            fetchCustomerOrders();
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };


    const handleDeleteOrder = async (orderId) => {
        try {
            await axios.delete(`http://localhost:8080/api/orders/${orderId}`);
            alert('Order deleted successfully!');
            fetchCustomerOrders();
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const handleInputChange = (orderId, field, value) => {
        const updatedOrders = orders.map((order) =>
            order.id === orderId ? { ...order, [field]: value } : order
        );
        setOrders(updatedOrders);
    };

    return (
        <div className="container">
            <h2>Customer Dashboard</h2>
            {customer && (
                <div>
                    <h4>Customer Details</h4>
                    <p>Name: {customer.name}</p>
                    <p>Email: {customer.email}</p>
                    <p>Phone: {customer.phoneNumber}</p>
                </div>
            )}

            <h4>Your Orders</h4>
            <table className="table">
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Quantity</th>
                    <th>Size</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.orderDate}</td>
                        <td>{order.status}</td>
                        <td>
                            <input
                                type="number"
                                value={order.quantity}
                                min="1"
                                onChange={(e) =>
                                    handleInputChange(order.id, 'quantity', e.target.value)
                                }
                            />
                        </td>
                        <td>
                            <select
                                value={order.size}
                                onChange={(e) =>
                                    handleInputChange(order.id, 'size', e.target.value)
                                }
                            >
                                <option value="S">Small</option>
                                <option value="M">Medium</option>
                                <option value="L">Large</option>
                            </select>
                        </td>
                        <td>
                            <button onClick={() => handleUpdateOrder(order)}>Update</button>
                            <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerDashboard;
