import express from 'express';
import { getItem, addItem, editItem, deleteItem } from '../controllers/item.controller.js';

const router = express.Router();

router.get('/getItem', getItem);
router.post('/addItem', addItem);
router.put('/editItem/:id', editItem);
router.delete('/deleteItem/:id', deleteItem);


export default router;