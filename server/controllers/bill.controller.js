import Bill from "../models/bill.model.js";

export const getBills = async (req, res) => {
    try {
        const bills = await Bill.find();
        res.json(bills);
    } catch (error) {
        console.error('Error fetching bills:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



export const addBill = async (req, res) => {
    try {
        const { total_amount, items } = req.body;

        if (total_amount < 0 || !Array.isArray(items)) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        const newBill = new Bill({ total_amount, items });

        const savedBill = await newBill.save();

        res.status(201).json(savedBill);
    } catch (error) {
        console.error('Error adding bill:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


