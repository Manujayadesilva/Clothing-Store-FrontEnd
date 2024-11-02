import React, { useState } from 'react';
import axios from 'axios';

const CustomerSignUp = () => {
    const [customer, setCustomer] = useState({ name: '', email: '', phoneNumber: '', password: '' });
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {

            await axios.post('http://localhost:8080/api/customers', customer);
            setMessage('Sign up successful! You can now sign in.');
        } catch (error) {
            console.error('Error signing up', error);
            setMessage('Error signing up. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2>Customer Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={customer.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={customer.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phoneNumber"
                        value={customer.phoneNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={customer.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CustomerSignUp;