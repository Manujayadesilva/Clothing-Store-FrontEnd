import React, { useState } from 'react';
import InventoryCRUD from './InventoryCRUD';
import CustomerCRUD from './CustomerCRUD';
import OrderCRUD from './OrderCRUD';

const AdminLogin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('inventory');

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === 'admin' && password === 'password') {
            setIsLoggedIn(true);
            setError('');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="container">
            {isLoggedIn ? (
                <div>
                    <h2>Admin Dashboard</h2>
                    <div className="tabs">
                        <button onClick={() => setActiveTab('inventory')}>Inventory</button>
                        <button onClick={() => setActiveTab('customers')}>Customers</button>
                        <button onClick={() => setActiveTab('orders')}>Orders</button>
                    </div>

                    {activeTab === 'inventory' && <InventoryCRUD />}
                    {activeTab === 'customers' && <CustomerCRUD />}
                    {activeTab === 'orders' && <OrderCRUD />}
                </div>
            ) : (
                <div>
                    <h2>Admin Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminLogin;
