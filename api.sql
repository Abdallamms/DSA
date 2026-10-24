CREATE DATABASE bd_dsapi;

CREATE TABLE cidades (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR (50) NOT NULL
);

CREATE TABLE clientes (
    id INT NOT NULL,
    nome VARCHAR (100) NOT NULL,
    altura DOUBLE NOT NULL,
    nascimento DATE NOT NULL,
    cidade_id INT NOT NULL,
    FOREIGN KEY () REFERENCES clientes (cidade_id)
);

CREATE TABLE  pedidos(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    horario DATETIME,
    endereco VARCHAR(200) NOT NULL,
    cliente_id INT NOT NULL
);

CREATE TABLE pedidos_produtos(
    pedido_id INT(5) NOT NULL,
    produto_id INT(5) NOT NULL,
    preco DOUBLE PRIMARY KEY NOT NULL,
    quantidade DOUBLE PRIMARY KEY NOT NULL
);

CREATE TABLE produtos (
    id INT,
    nome VARCHAR (100) NOT NULL,
    preco DOUBLE PRIMARY KEY NOT NULL,
    quantidade DOUBLE PRIMARY KEY NOT NULL,
    categoria_id INT (50)
);

CREATE TABLE categorias(
    id INT,
    nome VARCHAR (100) NOT NULL

);