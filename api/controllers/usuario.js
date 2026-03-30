import { db } from '../config/db.js';

// Cadastrando produtos
export const postUsuario = async (req, res) => {
    try {
        const { nome, sobrenome, contatos, email, senha, confirmar_senha } = req.body;
        const [result] = await
            db.query('INSERT INTO usuarios (nome, sobrenome, contatos, email, senha, confirmar_senha) VALUES(?,?,?,?,?,?)',
                [nome, sobrenome, contatos, email, senha, confirmar_senha]);
        return res.status(201).json({ id: result.insertId, nome, sobrenome, contatos, email, senha, confirmar_senha })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar novo usuário.' });
    }

};

// Listando produtos
export const getUsuario = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        res.status(500);
    }
};

// Atualizar produtos
export const putUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, sobrenome, contatos, email, senha, confirmar_senha } = req.body;
        const result =
            await db.query('UPDATE usuarios SET nome = ?, sobrenome = ?, contatos = ?, email = ?, senha = ?, confirmar_senha = ? WHERE id = ?',
                [nome, sobrenome, contatos, email, senha, confirmar_senha, id]);
        return res.json({ id: result.insertId, nome, sobrenome, contatos, email, senha, confirmar_senha })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao editar usuário.' });
    }
};

// Deletar produtos
export const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
        return res.json({ message: 'Produto apagado.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao apagar usuário.' })
    }
};

// login
export const loginUsuario = async (req, res) => {
    try {
        const { nome, senha } = req.body;
        const result = await db.query('SELECT * FROM usuarios WHERE nome = ? AND senha = ?', [nome, senha]);
        return res.status(200).json({ message: 'Logado com sucesso.', Usuario: result[0] });
    } catch (error) {
            res.status(500).json({ error: 'Erro ao fazer login.' });
    }
}
