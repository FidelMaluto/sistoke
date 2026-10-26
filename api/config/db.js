import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Angola@123',
    database: process.env.DB_NAME || 'sistoke',
    waitForConnections: true,
    dateStrings: true
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
