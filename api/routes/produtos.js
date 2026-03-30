import express from 'express';
import {
    postProduto,
    getProdutos,
    putProduto,
    deleteProduto
} from '../controllers/produto.js';

const Route = express.Router();

Route.get('/produtos', getProdutos);
Route.post('/produto', postProduto);
Route.put('/produto/:id', putProduto);
Route.delete('/produto/:id', deleteProduto);

export default Route;
