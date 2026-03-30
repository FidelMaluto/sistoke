import express from 'express';
import {
    postUsuario,
    getUsuario,
    putUsuario,
    deleteUsuario,
    loginUsuario
} from '../controllers/usuario.js';

const Route = express.Router();

Route.get('/usuarios', getUsuario);
Route.post('/usuario', postUsuario);
Route.put('/usuario/:id', putUsuario);
Route.delete('/usuario/:id', deleteUsuario);
Route.post('/usuario/login', loginUsuario);

export default Route;
