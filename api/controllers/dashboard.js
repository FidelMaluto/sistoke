import { db } from '../config/db.js';

export const dashboard = async (req, res) => {
  try {
    const queries = {
      totalProdutos: "SELECT COUNT(*) as total FROM produtos",
      valorTotal: "SELECT SUM(preco_unitario * quantidade) as total FROM produtos",
      stockBaixo: "SELECT COUNT(*) as total FROM produtos WHERE quantidade < 5",
      categorias: "SELECT categoria, COUNT(*) as total FROM produtos GROUP BY categoria"
    };

    // Executa as queries com await
    const [totalProdRows] = await db.query(queries.totalProdutos);
    const [valorTotalRows] = await db.query(queries.valorTotal);
    const [stockBaixoRows] = await db.query(queries.stockBaixo);
    const [categoriasRows] = await db.query(queries.categorias);

    // Monta a resposta
    res.json({
      totalProdutos: totalProdRows[0]?.total || 0,
      valorTotal: valorTotalRows[0]?.total || 0,
      stockBaixo: stockBaixoRows[0]?.total || 0,
      categorias: categoriasRows.map(c => c.categoria),
      dados: categoriasRows.map(c => c.total)
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar dashboard" });
  }
};