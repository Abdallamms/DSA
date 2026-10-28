    ALTER TABLE clientes
    ADD email VARCHAR(100),
    ADD senha VARCHAR(255);

    ALTER TABLE pedidos
    ADD status VARCHAR(20) DEFAULT 'PENDENTE';



INSERT INTO cidades (id, nome) VALUES 
(1, "Porto Alegre"),
(2, "Alvorada"),
(3, "Viamão"),
(4, "Gramado"),
(5, "São Paulo"),
(6, "Rio de Janeiro"),
(7, "Gravataí");

INSERT INTO categorias (id, nome) VALUES 
(1, "Eletrônicos"),
(2, "Alimentação")
(3, "Produtos de Limpeza");

INSERT INTO clientes (id, nome, altura, nascimento, cidade_id, email, senha, is_admin) VALUES 
(1, "Administrador do Sistema", 1.90, "1990-02-20", 1, "admin@gmail.com", "admi8345", 1),
(2, "Carlos Silva", 1.75, "1995-05-15", 1, "Carlosslv@gmail.com", "car1234", 0),
(3, "João Gomes dos Santos", 1.78, "1977-02-05", 1, "jgdossantos@gmail.com", "jgsanpq3087", 0 ),
(4, "Maria das Graças", 1.65, "1978-03-15", 4, "maria@gmail.com", "mariopqsd4", 0),
(5, "Carlos Souza", 1.80, "1994-08-22", 2, "carlo@gmail.com", "senha123", 0 );

INSERT INTO produtos (id, nome, preco, quantidade, categoria_id) VALUES 
(1, "Mouse Sem Fio", 89.90, 50, 1),
(2, "Teclado Mecânico RGB", 250.00, 15, 1),
(3, "Fone de Ouvido", 25.00, 50, 1),
(4, "Monitor", 60.00, 20, 1),
(5, "Pendrive", 25.87, 16, 1),
(6, "Cadeira Gamer", 1030.53, 70, 1),
(7, "Placa de Video RX 500 (8GB)", 500.43, 20, 1),
(8, "Bandeija de Ovos marrons", 10.00, 100, 2),
(9, "Detergente Veja", 2.99, 100, 3),
(10, "Carregador", 25.00, 30, 1);