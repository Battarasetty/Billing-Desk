import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import itemRouter from './routes/item.route.js';
import billRouter from './routes/bill.route.js';

dotenv.config();

mongoose
    .connect("mongodb+srv://harishbattarasetty:12345678910@personalapp.a8ejxkf.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("Db connection successfull:-))");
    })
    .catch((err) => {
        console.log(err);
    })

const app = express();

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/api/item', itemRouter);
app.use('/api/bill', billRouter);
