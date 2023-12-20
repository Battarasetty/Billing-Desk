import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddItemDialog = ({ onAddItem, onClose, selectedItem }) => {
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (selectedItem) {
            setItemName(selectedItem.item_name || '');
            setPrice(selectedItem.price || '');
        } else {
            setItemName('');
            setPrice('');
        }
    }, [selectedItem]);

    const handleAddItem = () => {
        if (!itemName || price < 1) {
            console.error('Invalid input');
            return;
        }

        const newItem = {
            item_name: itemName,
            price: Number(price),
        };

        onAddItem(newItem);
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {selectedItem ? 'Edit Item' : 'Add Item'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId='itemName'>
                        <Form.Label>Item Name:</Form.Label>
                        <Form.Control
                            type='text'
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='price'>
                        <Form.Label>Price:</Form.Label>
                        <Form.Control
                            type='number'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose} style={{background: "red"}}>
                    Close
                </Button>
                <Button variant='primary' onClick={handleAddItem} style={{background: "green"}}>
                    {selectedItem ? 'Edit Item' : 'Add Item'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddItemDialog;
