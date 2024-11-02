import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InventoryCRUD = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ itemName: '', quantity: 0, price: 0 });
    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/inventory')
            .then(response => setItems(response.data))
            .catch(error => console.error('Error fetching inventory:', error));
    }, []);

    const handleAddItem = () => {
        axios.post('http://localhost:8080/api/inventory', newItem)
            .then(response => {
                setItems([...items, response.data]);
                setNewItem({ itemName: '', quantity: 0, price: 0 });
            })
            .catch(error => console.error('Error adding item:', error));
    };

    const handleEditItem = (item) => {
        setEditItem(item);
    };

    const handleUpdateItem = () => {
        axios.put(`http://localhost:8080/api/inventory/${editItem.id}`, editItem)
            .then(response => {
                setItems(items.map(item => item.id === response.data.id ? response.data : item));
                setEditItem(null);
            })
            .catch(error => console.error('Error updating item:', error));
    };

    const handleDeleteItem = (id) => {
        axios.delete(`http://localhost:8080/api/inventory/${id}`)
            .then(() => setItems(items.filter(item => item.id !== id)))
            .catch(error => console.error('Error deleting item:', error));
    };

    return (
        <div>
            <h3>Add New Item</h3>
            <input
                type="text"
                placeholder="Item Name"
                value={newItem.itemName}
                onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
            />
            <input
                type="number"
                placeholder="Quantity"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value, 10) })}
            />
            <input
                type="number"
                placeholder="Price"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
            />
            <button onClick={handleAddItem}>Add Item</button>

            {editItem && (
                <div>
                    <h3>Edit Item</h3>
                    <input
                        type="text"
                        value={editItem.itemName}
                        onChange={(e) => setEditItem({ ...editItem, itemName: e.target.value })}
                    />
                    <input
                        type="number"
                        value={editItem.quantity}
                        onChange={(e) => setEditItem({ ...editItem, quantity: parseInt(e.target.value, 10) })}
                    />
                    <input
                        type="number"
                        value={editItem.price}
                        onChange={(e) => setEditItem({ ...editItem, price: parseFloat(e.target.value) })}
                    />
                    <button onClick={handleUpdateItem}>Update Item</button>
                </div>
            )}

            <h3>Inventory Items</h3>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.itemName} - {item.quantity} - ${item.price}
                        <button onClick={() => handleEditItem(item)}>Edit</button>
                        <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InventoryCRUD;
