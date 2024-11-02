import React, { useState, } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { item, customer } = location.state || {};
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('S');



    const handleSubmitOrder = () => {
        const order = {
            customer: { id: customer.id },
            orderDate: new Date().toISOString(),
            status: 'Pending',
            quantity: quantity,
            size: size
        };

        axios.post('http://localhost:8080/api/orders', order)
            .then(response => {
                alert('Order placed successfully!');
                navigate('/');
            })
            .catch(error => {
                console.error('Error placing order:', error);
            });
    };




    return (
        <div>
            <h2>Place Your Order</h2>
            {item ? (
                <div>
                    <h3>{item.itemName}</h3>
                    <p>Price: ${item.price}</p>

                    <label>Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="1"
                    />

                    <label>Size:</label>
                    <select
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    >
                        <option value="S">Small</option>
                        <option value="M">Medium</option>
                        <option value="L">Large</option>
                    </select>

                    <button onClick={handleSubmitOrder}>Submit Order</button>
                </div>
            ) : (
                <p>No item selected.</p>
            )}
        </div>
    );
};

export default OrderPage;
