import express, {json} from "express";
import pg from 'pg';

const { Pool } = pg;

const app = express();

const pool = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'db',
    password: 'postgres',
    port: 5432,
});

app.get('/', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM clients');
        const results = { results: (result) ? result.rows : null };
        res.send(results);
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

app.post("/cadastro", async (req, res) => {})

app.get("/busca/ddd", async (req, res) => {})

app.get("/busca/nome", async (req, res) => {})

app.put("/editar/:id", async (req, res) => {})

app.delete("/excluir/:id", async (req, res) => {})

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});