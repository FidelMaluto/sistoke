import { db } from '../config/db.js';

// Cadastrando produtos
export const postProduto = async (req, res) => {
    try {
        const { nome, quantidade, categoria, preco_unitario, marca_produto, data_cadastro, data_entrada } = req.body;
        const [result] = await
            db.query('INSERT INTO produtos (nome, quantidade, categoria, preco_unitario, marca_produto, data_cadastro, data_entrada) VALUES(?,?,?,?,?,?,?)',
                [nome, quantidade, categoria, preco_unitario, marca_produto, data_cadastro, data_entrada])
        return res.status(201).json({ id: result.insertId, nome, quantidade, categoria, preco_unitario, marca_produto, data_cadastro, data_entrada })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar novo produto.', error });
    }

};

// Listando produtos
export const getProdutos = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM produtos');
        res.json(rows);
    } catch (error) {
        res.status(500);
    }
};

// Atualizar produtos
export const putProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, quantidade, categoria, preco_unitario, marca_produto, data_cadastro, data_entrada } = req.body;
        const result =
            await db.query('UPDATE produtos SET nome = ?, quantidade = ?, categoria = ?, preco_unitario = ?, marca_produto = ?, data_cadastro = ?, data_entrada = ? WHERE id = ?',
                [nome, quantidade, categoria, preco_unitario, marca_produto, data_cadastro, data_entrada, id]);
        return res.json({ id: result.insertId, nome, quantidade, categoria, preco_unitario, marca_produto, data_cadastro, data_entrada });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao editar produtos.', error });
    }
};

// Deletar produtos
export const deleteProduto = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM produtos WHERE id = ?', [id]);
        return res.json({ message: 'Produto apagado.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao apagar produto.' })
    }
};
