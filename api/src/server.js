import express, {json} from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: 'json' };
import dotenv from "dotenv";
import cors from "cors"
import clients from "./utils/querys.js"

dotenv.config({path:"../.env"});
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(json());
app.use(cors());

app.get('/clientes', async (req, res) => {
    try {
        const result = await clients.getAllClients();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/clientes/:id', async (req, res) => {
    try {
        const result = await clients.getClientById(req.params.id);
        if (!result) {
            res.status(404).json({ error: 'Not Found' });
    } else {
        res.json(result);
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/clientes/filtro/ddd/:ddd', async (req, res) => {
    try {

        const result = await clients.filterClientsByCelularDDD(req.params.ddd);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/clientes/filtro/nome/:nome', async (req, res) => {
    try {
        const result = await clients.filterClientsByNome(req.params.nome);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/clientes', async (req, res) => {
    try {
        const result = await clients.createClient(req.body.cpf, req.body.nome, req.body.celular, req.body.celular2, req.body.email, req.body.email2);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/clientes/:id', async (req, res) => {
    try {
        const result = await clients.updateClient(req.params.id, req.body.cpf, req.body.nome, req.body.celular1, req.body.celular2, req.body.email1, req.body.email2);
        if (!result) {
            res.status(404).json({ error: 'Not Found' });
        } else {
        res.json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/clientes/:id', async (req, res) => {
    try {
        const result = await clients.deleteClient(req.params.id);
        if (!result) {
            res.status(404).json({ error: 'Not Found' });
    } else {
        res.status(204).json(result);
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const port = process.env.PORT || 3000;
const nome = process.env.NOME || "Teste Assertiva";

app.listen(port, () => {
    console.log(`${nome} on Port: ${port}`);
});