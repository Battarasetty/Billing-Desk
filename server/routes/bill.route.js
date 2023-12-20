import express from 'express';
import { getBills, addBill } from '../controllers/bill.controller.js';

const router = express.Router();

router.get('/getBills', getBills);
router.post('/bills', addBill)

export default router;