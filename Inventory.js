import React, { useState, useEffect } from "react";
import axios from "axios";

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ itemName: "", quantity: 0, price: 0 });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const response = await axios.get("http://localhost:8080/api/inventory");
        setItems(response.data);
    };

    const handleInputChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    const handleAddItem = async () => {
        await axios.post("http://localhost:8080/api/inventory", newItem);
        fetchItems();
    };

    const handleDeleteItem = async (id) => {
        await axios.delete('http://localhost:8080/api/inventory/${id}');
        fetchItems();
    };

    return (
        <div className="container">
            <h2>Inventory</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td>{item.itemName}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleDeleteItem(item.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h4>Add New Item</h4>
            <input
                type="text"
                name="itemName"
                placeholder="Item Name"
                value={newItem.itemName}
                onChange={handleInputChange}
            />
            <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={newItem.quantity}
                onChange={handleInputChange}
            />
            <input
                type="number"
                name="price"
                placeholder="Price"
                value={newItem.price}
                onChange={handleInputChange}
            />
            <button className="btn btn-primary" onClick={handleAddItem}>Add Item</button>
        </div>
    );
};

export default Inventory;