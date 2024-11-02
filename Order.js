import React, { useState, useEffect } from "react";
import axios from "axios";

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [newOrder, setNewOrder] = useState({ orderNumber: "", customerName: "", total: 0 });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const response = await axios.get("http://localhost:8080/api/orders");
        setOrders(response.data);
    };

    const handleInputChange = (e) => {
        setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
    };

    const handleAddOrder = async () => {
        await axios.post("http://localhost:8080/api/orders", newOrder);
        fetchOrders();
    };

    const handleDeleteOrder = async (id) => {
        await axios.delete('http://localhost:8080/api/orders/${id}');
        fetchOrders();
    };

    return (
        <div className="container">
            <h2>Orders</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Order Number</th>
                    <th>Customer Name</th>
                    <th>Total</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td>{order.orderNumber}</td>
                        <td>{order.customerName}</td>
                        <td>{order.total}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleDeleteOrder(order.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h4>Add New Order</h4>
            <input
                type="text"
                name="orderNumber"
                placeholder="Order Number"
                value={newOrder.orderNumber}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="customerName"
                placeholder="Customer Name"
                value={newOrder.customerName}
                onChange={handleInputChange}
            />
            <input
                type="number"
                name="total"
                placeholder="Total"
                value={newOrder.total}
                onChange={handleInputChange}
            />
            <button className="btn btn-primary" onClick={handleAddOrder}>Add Order</button>
        </div>
    );
};

export default Order;