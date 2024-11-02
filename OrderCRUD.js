import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderCRUD = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    return (
        <div>
            <h3>All Orders</h3>
            <table className="table">
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Quantity</th>
                    <th>Size</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.customer?.name || 'N/A'}</td>
                        <td>{order.orderDate}</td>
                        <td>{order.status}</td>
                        <td>{order.quantity}</td>
                        <td>{order.size}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderCRUD;
