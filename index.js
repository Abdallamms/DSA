const express = require("express");
const knex = require("knex");
const http_errors = require('http-errors')

const api = express();
api.use(express.json()); 

const port = 8000

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
    const { nome, altura, nascimento, cidade_id} = req.body;

    if (!nome || !altura|| !nascimento|| !cidade_id) {
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

api.get('/clientes', (req, res, next) => {
    conn("clientes")
        .select("*")
        .then((clientes) => {
             const Cliente = clientes.map(c =>{
                return{
                    ...c,
                    nascimento: c.nascimento ? new Date (c.nascimento).toISOString().split('T')[0]: null
                };
             });
            res.status(200).json(Cliente);
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
    const { nome, preco,id, quantidade, categoria_id, is_admin } = req.body;
    if (is_admin !== 1) {
        return res.status(403).json({ erro: "Acesso negado. Apenas administradores podem cadastrar produtos!" });
    }
    if (!nome || !preco ||!id ||!quantidade || !categoria_id) {
        return res.status(400).json({ erro: "Os campos nome, preço e categoria são obrigatórios!" });
    }
    conn("produtos")
        .insert({
            nome: nome,
            preco: preco,
            id: id, 
            quantidade: quantidade,
            categoria_id: categoria_id
        })
        .then(() => {
            res.status(201).json({ resposta: "Produto cadastrado com sucesso pelo administrador!" });
        })
        .catch(next); 
});

api.get("/produtos", (req, res , next) => {
    conn("produtos")
     .select("*")
     .then((produtos) => {
         res.status(201).json(produtos);
        })
        .catch(next); 
})

api.delete('/produtos/:id', (req, res, next) => {
    const { id } = req.params;
    const { is_admin } = req.body;
    if (is_admin !== 1) {
        return res.status(403).json({ erro: "Acesso negado. Apenas administradores podem deletar produtos!" });
    }
    conn("produtos")
        .where({ id: id })
        .del()
        .then((Deletar) => {
            if (Deletar === 0) {
                return res.status(404).json({ erro: "Produto não encontrado para exclusão!" });
            }

            res.status(200).json({ resposta: "Produto deletado com sucesso pelo administrador!" });
        })
        .catch(next);
});

api.get("/produtos/disponiveis", (req, res, next) => {
    conn("produtos")
        .select("*")
        .where("quantidade", ">", 0) 
        .then((produtosDisponiveis) => {
            res.status(200).json(produtosDisponiveis);
        })
        .catch(next);
});


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

api.post('/pedidos', (req, res, next) => {
    const { endereco, cliente_id, itens } = req.body;
    if (!endereco || !cliente_id || !itens || !Array.isArray(itens) || itens.length === 0) {
        return res.status(400).json({ erro: "Os campos endereco, cliente_id e a lista de itens são obrigatórios!" });
    }
    conn("pedidos")
        .insert({
            horario: new Date(),
            endereco: endereco,
            cliente_id: cliente_id
        })
        .then((idDoPedidoGerado) => {
            const pedido_id = idDoPedidoGerado[0];
            const itensParaSalvar = itens.map(item => {
                return {
                    pedido_id: pedido_id,
                    produto_id: item.produto_id,
                    preco: item.preco,
                    quantidade: item.quantidade
                };
            });
            conn("pedidos_produtos")
                .insert(itensParaSalvar)
                .then(() => {
                    res.status(201).json({ 
                        resposta: "Pedido realizado com sucesso!",
                        pedido_id: pedido_id 
                    });
                })
                .catch(next);
        })
        .catch(next);
});

api.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
