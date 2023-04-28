import connection from "../config/database.js";

const getAllClients = async () => {
    const { rows } = await connection.query('SELECT * FROM clients');
    return rows;
};

const getClientById = async (id) => {
    const { rows } = await connection.query('SELECT * FROM clients WHERE id = $1', [id]);
    return rows[0];
};

const createClient = async (cpf, nome, celular, celular2, email, email2) => {
    const { rows } = await connection.query('INSERT INTO clients (cpf, nome, celular, celular2, email, email2) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [cpf, nome, celular, celular2, email, email2]);
    return rows[0];
};

const updateClient = async (id, cpf, nome, celular, celular2, email, email2) => {
    const { rows } = await connection.query('UPDATE clients SET cpf = $2, nome = $3, celular = $4, celular2 = $5, email = $6, email2 = $7 WHERE id = $1 RETURNING *', [id, cpf, nome, celular, celular2, email, email2]);
    return rows[0];
};

const deleteClient = async (id) => {
    const { rows } = await connection.query('DELETE FROM clients WHERE id = $1 RETURNING *', [id]);
    return rows[0];
};

const filterClientsByCelularDDD = async (ddd) => {
    const { rows } = await connection.query('SELECT * FROM clients WHERE celular LIKE $1 OR celular2 LIKE $1', [`${ddd}%`]);
    return rows;
};

const filterClientsByNome = async (nome) => {
    const { rows } = await connection.query('SELECT * FROM clients WHERE nome ILIKE $1', [`%${nome}%`]);
    return rows;
};

const clients = {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient,
    filterClientsByCelularDDD,
    filterClientsByNome,
};

export default clients;