import { db } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const SECRET = "super_seguro";

// Cadastrando produtos
export const postUsuario = async (req, res) => {
    try {
        const { nome, sobrenome, contatos, email, senha, confirmar_senha } = req.body;

         const senhaHash = await bcrypt.hash(senha, 10);
         const senhaHash1 = await bcrypt.hash(confirmar_senha, 10);
        
        const [result] = await
            db.query('INSERT INTO usuarios (nome, sobrenome, contatos, email, senha, confirmar_senha) VALUES(?,?,?,?,?,?)',
                [nome, sobrenome, contatos, email, senhaHash, senhaHash1]);
        return res.status(201).json({ id: result.insertId, nome, sobrenome, contatos, email, senhaHash, senhaHash1 })
    } catch (error) {
        console.log(error);
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

        const senhaHash = await bcrypt.hash(senha, 10);
         const senhaHash1 = await bcrypt.hash(confirmar_senha, 10);
        
        const result =
            await db.query('UPDATE usuarios SET nome = ?, sobrenome = ?, contatos = ?, email = ?, senha = ?, confirmar_senha = ? WHERE id = ?',
                [nome, sobrenome, contatos, email, senhaHash, senhaHash1, id]);
        return res.json({ id: result.insertId, nome, sobrenome, contatos, email, senhaHash, senhaHash1 })
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

        // Buscar usuário
        const [result] = await db.query(
            'SELECT * FROM usuarios WHERE nome = ?', 
            [nome]
        );

        if (result.length === 0) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        const usuario = result[0];

        // Comparar senha criptografada
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        // Criar token
        const token = jwt.sign(
            { id: usuario.id, nome: usuario.nome },
            SECRET,
            { expiresIn: "8h" }
        );

        return res.status(200).json({
            message: 'Login realizado com sucesso',
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome
            }
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
};

// MIDDLEWARE para verificar tokon

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "segredo");
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};
