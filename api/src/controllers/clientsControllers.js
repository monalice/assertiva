import { STATUS_CODE } from '../utils/statusCode.js';
import clients from "../repository/clientsRepository.js"

async function postClient(req, res) {
    try {
        const result = await clients.createClient(req.body.cpf, req.body.nome, req.body.celular, req.body.celular2, req.body.email, req.body.email2);
        res.status(STATUS_CODE.SUCCESSCREATED).json(result);
    } catch (error) {
        console.error(error);
        res.status(STATUS_CODE.SERVERERRORINTERNAL).json({ error: 'Internal Server Error' });
    }
}

async function putClient(req, res) {
    try {
        const result = await clients.updateClient(req.body.id, req.body.cpf, req.body.nome, req.body.celular, req.body.celular2, req.body.email, req.body.email2);
        if (!result) {
            res.status(STATUS_CODE.ERRORNOTFOUND).json({ error: 'Not Found' });
        } else {
        res.status(STATUS_CODE.SUCCESSOK).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(STATUS_CODE.SERVERERRORINTERNAL).json({ error: 'Internal Server Error' });
    }
}

async function deleteClient(req, res) {
    try {
        const result = await clients.deleteClient(req.params.id);
        if (!result) {
            res.status(STATUS_CODE.ERRORNOTFOUND).json({ error: 'Not Found' });
    } else {
        res.status(STATUS_CODE.SUCCESSOK).json(result);
    }
    } catch (error) {
        console.error(error);
        res.status(STATUS_CODE.SERVERERRORINTERNAL).json({ error: 'Internal Server Error' });
    }
}

async function getAllClient(req, res) {
    try {
        const result = await clients.getAllClients();
        res.status(STATUS_CODE.SUCCESSOK).json(result);
    } catch (error) {
        console.error(error);
        res.status(STATUS_CODE.SERVERERRORINTERNAL).json({ error: 'Internal Server Error' });
    }
}

async function getByIdClient(req, res) {
    try {
        const result = await clients.getClientById(req.params.id);
        if (!result) {
            res.status(STATUS_CODE.ERRORNOTFOUND).json({ error: 'Not Found' });
    } else {
        res.status(STATUS_CODE.SUCCESSOK).json(result);
    }
    } catch (error) {
        console.error(error);
        res.status(STATUS_CODE.SERVERERRORINTERNAL).json({ error: 'Internal Server Error' });
    }
}

async function getByDDDClient(req, res) {
    try {
        const result = await clients.filterClientsByCelularDDD(req.params.ddd);
        res.status(STATUS_CODE.SUCCESSOK).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getByNameClient(req, res) {
    try {
        const result = await clients.filterClientsByNome(req.params.nome);
        res.status(STATUS_CODE.SUCCESSOK).json(result);
    } catch (error) {
        console.error(error);
        res.status(STATUS_CODE.SERVERERRORINTERNAL).json({ error: 'Internal Server Error' });
    }
}

export {
    postClient,
    putClient,
    deleteClient,
    getAllClient,
    getByIdClient,
    getByDDDClient,
    getByNameClient
};