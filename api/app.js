import express from 'express';
import cors from 'cors';
import usuarioRoute from './routes/usuarios.js';
import produtoRoute from './routes/produtos.js';
import dashboardRoute from './routes/dashboard.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', usuarioRoute);
app.use('/', produtoRoute);
app.use('/', dashboardRoute);

export default app;
