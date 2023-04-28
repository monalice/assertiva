CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    nome VARCHAR(100) NOT NULL,
    celular VARCHAR(15) NOT NULL,
    celular2 VARCHAR(15),
    email VARCHAR(100) NOT NULL,
    email2 VARCHAR(100)
);

INSERT INTO clients (cpf, nome, celular, email) VALUES
    ('12345678901', 'John Doe', '32999887767', 'john.doe@example.com'),
    ('09878967545', 'Jane Doe', '32987655679', 'jane.doe@example.com');