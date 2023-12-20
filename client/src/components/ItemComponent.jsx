import React, { useState, useEffect } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import AddItemDialog from './ItemDialog/AddItemDialog';
import { MdEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


const ItemComponent = () => {
  const [isAddItemDialogOpen, setAddItemDialogOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); 

  const handleOpenDialog = (item) => {
    setSelectedItem(item); 
    setAddItemDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null); 
    setAddItemDialogOpen(false);
  };

  const navigate = useNavigate();


  const onAddItem = async (newItem) => {
    try {
      const apiUrl = selectedItem
        ? `http://localhost:3001/api/item/editItem/${selectedItem._id}`
        : 'http://localhost:3001/api/item/addItem';

      const response = await fetch(apiUrl, {
        method: selectedItem ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error('Error adding/editing item');
      }

      const updatedItem = await response.json();

      if (selectedItem) {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === selectedItem._id ? updatedItem : item
          )
        );
      } else {
        setItems((prevItems) => [...prevItems, updatedItem]);
      }
    } catch (error) {
      console.error('Error adding/editing item:', error);
    } finally {
      handleCloseDialog(); 
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/item/getItem');
        if (response.ok) {
          const itemsData = await response.json();
          setItems(itemsData);
        } else {
          console.error('Error fetching items:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleNavigate = (item) => {
    navigate(`/newbill/${item._id}`, { state: { item } });
  };


  return (
    <div className='w-full bg-slate-700 rounded-lg' style={{ height: '100vh' }}>
      <h3 className='text-white text-center'>Items List</h3>
      <button
        className='h-10 w-10 rounded-full flex items-center justify-center bg-white'
        onClick={() => handleOpenDialog(null)} 
        style={{ position: 'relative', top: '87vh', left: '95vw' }}
      >
        <IoIosAddCircleOutline className='bg-slate-700 rounded-lg text-white' />
      </button>

      {isAddItemDialogOpen && (
        <AddItemDialog
          onAddItem={onAddItem}
          onClose={handleCloseDialog}
          selectedItem={selectedItem} 
        />
      )}

      <div className='text-white'>
        <div className='border p-3 rounded-lg w-full h-20px'>
          <ul className='flex flex-col gap-3'>
            {items.map((item) => (
              <li
                key={item._id}
                onClick={() => handleNavigate(item)}
                className='border flex justify-between items-center p-3 rounded-lg w-full h-20px'
              >
                <div className='flex gap-3 items-center'>
                  {item.item_name}
                  <div className='cursor-pointer' onClick={(e) => { e.stopPropagation(); handleOpenDialog(item); }}>
                    <MdEdit />
                  </div>
                </div>
                <div className=''>${item.price}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ItemComponent;
