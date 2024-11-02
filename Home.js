import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [inventoryItems, setInventoryItems] = useState([]);
    const [signedInCustomer, setSignedInCustomer] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        axios.get('http://localhost:8080/api/inventory')
            .then(response => setInventoryItems(response.data))
            .catch(error => console.error('Error fetching inventory:', error));


        const customer = JSON.parse(localStorage.getItem('signedInCustomer'));
        setSignedInCustomer(customer);
    }, []);

    const handleOrderClick = (item) => {
        if (!signedInCustomer) {

            navigate('/customer-sign-in', { state: { from: '/order', item } });
            return;
        }


        navigate('/order', { state: { item, customer: signedInCustomer } });
    };


    return (
        <div>
            <h1>Welcome to the Style Corner</h1>
            <nav>
                <a href="/">Home</a> | <a href="/admin-login">Admin Login</a> | <a href="/customer-sign-in">Customer Sign In</a> | <a href="/customer-sign-up">Customer Sign Up</a>
            </nav>
            <h2>Inventory Items</h2>
            <ul>
                {inventoryItems.map(item => (
                    <li key={item.id}>
                        <h3>{item.itemName}</h3>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <button onClick={() => handleOrderClick(item)}>Order Now</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
