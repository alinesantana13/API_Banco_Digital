CREATE TABLE contas(
    numeroconta SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    saldo INTEGER DEFAULT 0
);
  
CREATE TABLE saques(
  id SERIAL PRIMARY KEY,
  numero_conta INTEGER NOT NULL REFERENCES contas(numeroconta),
  valor INTEGER NOT NULL
);
  
CREATE TABLE depositos(
  id SERIAL PRIMARY KEY,
  numero_conta INTEGER NOT NULL REFERENCES contas(numeroconta),
  valor INTEGER NOT NULL
);
  
CREATE TABLE transferencias(
  id SERIAL PRIMARY KEY,
  numero_conta_origem INTEGER NOT NULL REFERENCES contas(numeroconta),
  numero_conta_destino INTEGER NOT NULL REFERENCES contas(numeroconta),
  valor INTEGER NOT NULL
);


