const express = require("express");
const knex = require("knex");
const http_errors = require('http-errors')

const api = express();
api.use(express.json()); 

const port = 8000;

const conn = knex({
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "bd_dsapi"
    }
});

api.post('/cadastro', (req, res, next) => {
    const { nome, altura, nascimento, cidade_id, email, senha } = req.body;

    if (!nome || !altura|| !nascimento|| !cidade_id|| !email || !senha) {
        return res.status(400).json({ erro: "O preenchimento dos campos é obrigatório!" });
    }

    conn("clientes")
        .where({ email: email })
        .first()
        .then((ClienteExiste) => {
            if (ClienteExiste) {
                return res.status(400).json({ erro: "Este email já foi cadastrado!" });
            }

            conn("clientes")
                .insert({
                    nome: nome,
                    altura:altura,
                    nascimento:nascimento,
                    cidade_id:cidade_id,
                    email: email,
                    senha: senha
                })
                .then(() => {
                    res.status(201).json({ resposta: "Cliente cadastrado com sucesso!" });
                })
                .catch(next);
        })
        .catch(next);
});

api.post('/login', (req, res, next) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ erro: "E-mail e senha são obrigatórios!" });
    }
    conn("clientes")
        .where({ email: email, senha: senha })
        .first()
        .then((clientes) => {
            if (!clientes) {
                return res.status(401).json({ erro: "E-mail e/ou senha incorretos!" });
            }

            res.status(200).json({
                resposta: "Login realizado com sucesso!",
                cliente_id: clientes.id,
                nome:clientes.nome
            });
        })
        .catch(next); 
});

api.post('/produtos', (req, res, next) => {
    const { nome, preco, quantidade, categoria_id, is_admin } = req.body;
    if (is_admin !== 1) {
        return res.status(403).json({ erro: "Acesso negado. Apenas administradores podem cadastrar produtos!" });
    }
    if (!nome || !preco ||!quantidade || !categoria_id) {
        return res.status(400).json({ erro: "Os campos nome, preço e categoria são obrigatórios!" });
    }
    conn("produto")
        .insert({
            nome: nome,
            preco: preco,
            quantidade: quantidade,
            categoria_id: categoria_id
        })
        .then(() => {
            res.status(201).json({ resposta: "Produto cadastrado com sucesso pelo administrador!" });
        })
        .catch(next); 
});
api.get("/produtos",(req, res , next) => {
    conn("produtos")
    .select("*")
    .then(() => {
            res.status(201).json({ resposta: "Produto cadastrado com sucesso pelo administrador!" });
        })
        .catch(next); 
})
api.post('/cidades', (req, res, next) => {
    const { nome } = req.body;
    if (!nome) {
        return res.status(400).json({ erro: "O campo nome da cidade é obrigatório!" });
    }
    conn("cidades")
        .insert({
            nome: nome
        })
        .then(() => {
            res.status(201).json({ resposta: "Cidade cadastrada com sucesso!" });
        })
        .catch(next);
});
api.get('/cidades', (req, res, next) => {
    conn("cidades")
        .select("*")
        .then((cidades) => {
            res.status(200).json(cidades);
        })
        .catch(next);
});


api.post("/cadastro", Cadastro);
api.post("/login", Login);
api.get("/produtos", ConsultarProdutos);
api.post("/pedidos", RealizarPedido);
api.get("/pedidos", ListarPedidosCliente);

api.post("/admin/produtos", VerificarAdmin, CriarProduto);
api.put("/admin/produtos/:id", VerificarAdmin, AtualizarProduto);
api.delete("/admin/produtos/:id", VerificarAdmin, ExcluirProduto);
api.get("/admin/pedidos", VerificarAdmin, ListarTodosPedidos);

api.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
