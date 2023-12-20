import Item from "../models/item.model.js"


export const getItem = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const addItem = async (req, res) => {
    try {
        const { item_name, price } = req.body;

        if (!item_name || price < 1) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        const newItem = new Item({ item_name, price });

        const savedItem = await newItem.save();

        res.status(201).json(savedItem);
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



export const editItem = async (req, res) => {
    try {
        const { item_name, price } = req.body;

        if (!item_name || price < 1) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            { item_name, price },
            { new: true }
        );

        res.json(updatedItem);
    } catch (error) {
        console.error('Error editing item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const deleteItem = async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



