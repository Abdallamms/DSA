
## Senha e email adicionados na tabela clientes
CREATE DATABASE bd_dsapi;
Use bd_dsapi;

CREATE TABLE cidades (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR (50) NOT NULL
);

CREATE TABLE categorias(
    id INT NOT NULL PRIMARY KEY Auto_INCREMENT,
    nome VARCHAR (100) NOT NULL
);

CREATE TABLE clientes (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR (100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    altura DOUBLE NOT NULL,
    nascimento DATE NOT NULL,
    cidade_id INT NOT NULL,
    FOREIGN KEY (cidade_id) REFERENCES cidades(id)
);

CREATE TABLE  pedidos(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    horario DATETIME,
    endereco VARCHAR(200) NOT NULL,
    cliente_id INT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDENTE',
    FOREIGN KEY (cliente_id) REFERENCES  clientes(id)
);

CREATE TABLE produtos (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR (100) NOT NULL,
    preco DOUBLE NOT NULL,
    quantidade DOUBLE NOT NULL,
    categoria_id INT (50),
	FOREIGN KEY (categoria_id) REFERENCES categorias (id)

);

CREATE TABLE pedidos_produtos(
    pedido_id INT NOT NULL,
    produto_id INT NOT NULL,
    preco DOUBLE NOT NULL,
    quantidade DOUBLE NOT NULL,
    PRIMARY KEY (pedido_id, produto_id)
);



