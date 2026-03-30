import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Angola@123',
    database: 'sistoke'
});

async function testConect() {
    try {
        const conn = await db.getConnection();
        console.log('Conectado com sucesso!');
        conn.release();
    } catch (error){
        console.error('Erro ao conectar. ', error)
    }
}

testConect();
