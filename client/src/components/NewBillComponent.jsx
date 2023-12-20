import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';

const NewBillComponent = () => {
    const { id } = useParams();
    const location = useLocation();
    const { item } = location.state || {};
    console.log(item);
    const [quantity, setQuantity] = useState(1); 
    const [isPopupOpen, setPopupOpen] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState()
    console.log(totalAmount);
    console.log(selectedItems);

    const handleAddToBill = async () => {
        try {
            const totalAmount = item.price * quantity;

            const itemsArray = [
                {
                    item: item._id,
                    quantity: quantity,
                },
            ];

            console.log(itemsArray);

            const response = await fetch('http://localhost:3001/api/bill/bills', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    total_amount: totalAmount,
                    items: itemsArray,
                }),
            });

            if (!response.ok) {
                throw new Error('Error adding to bill');
            }

            const addedBill = await response.json();
            console.log('Bill added successfully:', addedBill);
            setSelectedItems(addedBill.items)
            setTotalAmount(addedBill.total_amount)
            setPopupOpen(false);
        } catch (error) {
            console.error('Error adding to bill:', error);
        }
    };



    const handleQuantityChange = (e) => {
        const selectedQuantity = parseInt(e.target.value, 10);
        setQuantity(selectedQuantity);
    };

    const handleRemoveItem = (itemId) => {
        setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.filter((selectedItem) => selectedItem.item._id !== itemId)
        );
    };

    return (
        <div className='w-full bg-slate-700 rounded-lg' style={{ height: '100vh' }}>
            <Modal show={isPopupOpen} onHide={() => setPopupOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add to Bill</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Item: {item.item_name}</p>
                    <p>Price: ${item.price}</p>
                    <Form>
                        <Form.Group controlId="quantity">
                            <Form.Label>Quantity:</Form.Label>
                            <Form.Control
                                as="select"
                                value={quantity}
                                onChange={handleQuantityChange}
                            >
                                {[...Array(10).keys()].map((value) => (
                                    <option key={value + 1} value={value + 1}>
                                        {value + 1}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setPopupOpen(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddToBill}>
                        Add to Bill
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className='flex items-center justify-between border px-3 py-2 rounded-lg w-full h-20px' style={{position: "relative", top: "20px", right: "10px"}}>
                <div>
                    <h3 className='text-white'>{item.item_name}</h3>
                    <ul>
                        {selectedItems.map((selectedItem) => (
                            <li className='flex' key={selectedItem.item._id}>
                                <div className='flex flex-col text-white'>
                                    <p>
                                        Quantity: {selectedItem.quantity}
                                    </p>
                                    {/* <button className='bg-slate-500 rounded-lg p-1' onClick={() => handleRemoveItem(selectedItem.item._id)}>
                                    Remove
                                </button> */}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='text-white'>
                    RS.{totalAmount}
                </div>
            </div>
        </div>
    );
};

export default NewBillComponent;
