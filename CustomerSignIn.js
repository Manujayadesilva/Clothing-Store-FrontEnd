import React, { useState } from 'react';
import axios from 'axios';
import CustomerDashboard from './CustomerDashboard';

const CustomerSignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [error, setError] = useState('');
    const [customer, setCustomer] = useState(null);

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:8080/api/customers/signin', {
                params: { email, password }
            });

            if (response.status === 200) {
                const customer = response.data;
                setIsSignedIn(true);
                setCustomer(customer);
                localStorage.setItem('signedInCustomer', JSON.stringify(customer));
                setError('');
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            console.error('Error signing in:', error);
            setError('Error signing in. Please try again.');
        }
    };


    return (
        <div className="container">
            {isSignedIn ? (
                <CustomerDashboard customer={customer} />
            ) : (
                <div>
                    <h2>Customer Sign In</h2>
                    <form onSubmit={handleSignIn}>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <button type="submit" className="btn btn-primary">Sign In</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CustomerSignIn;