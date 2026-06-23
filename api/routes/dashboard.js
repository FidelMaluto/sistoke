import express from 'express';
import { dashboard } from '../controllers/dashboard.js';

const Route = express.Router();

Route.get('/dashboard', dashboard);

export default Route;
