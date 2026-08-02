const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3003;

// Middlewares
app.use(cors());
app.use(express.json());

// Banco de dados em memória (simulado)
let estoque = [
  { id: 1, nome: 'Notebook', quantidade: 50 },
  { id: 2, nome: 'Mouse', quantidade: 100 },
  { id: 3, nome: 'Teclado', quantidade: 75 },
  { id: 4, nome: 'Monitor', quantidade: 30 }
];
let nextId = 5;

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Serviço de Estoque OK', timestamp: new Date() });
});

// Listar todo o estoque
app.get('/estoque', (req, res) => {
  res.json(estoque);
});

// Buscar produto por ID
app.get('/estoque/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = estoque.find(p => p.id === id);
  
  if (!produto) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
  
  res.json(produto);
});

// Adicionar produto ao estoque
app.post('/estoque', (req, res) => {
  const { nome, quantidade } = req.body;
  
  if (!nome || quantidade === undefined) {
    return res.status(400).json({ 
      error: 'Campos obrigatórios: nome, quantidade' 
    });
  }
  
  const novoProduto = {
    id: nextId++,
    nome,
    quantidade
  };
  
  estoque.push(novoProduto);
  
  console.log(`📦 Produto "${nome}" adicionado ao estoque com ${quantidade} unidades`);
  
  res.status(201).json(novoProduto);
});

// Reservar estoque (para um pedido)
app.post('/estoque/reservar', (req, res) => {
  const { produtoId, quantidade } = req.body;
  
  if (!produtoId || !quantidade) {
    return res.status(400).json({ 
      error: 'Campos obrigatórios: produtoId, quantidade' 
    });
  }
  
  const produto = estoque.find(p => p.id === produtoId);
  
  if (!produto) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
  
  if (produto.quantidade < quantidade) {
    return res.status(400).json({ 
      error: 'Estoque insuficiente',
      disponivel: produto.quantidade,
      solicitado: quantidade
    });
  }
  
  // Baixa do estoque
  produto.quantidade -= quantidade;
  
  console.log(`📦 Reserva de ${quantidade} unidades do produto ${produto.nome} (restam ${produto.quantidade})`);
  
  res.json({
    mensagem: 'Estoque reservado com sucesso',
    produto: produto,
    quantidadeReservada: quantidade
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`📦 Serviço de Estoque rodando na porta ${PORT}`);
});