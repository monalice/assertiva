import express, {json} from "express";
import dotenv from "dotenv";
import cors from "cors"
import connection from './config/database.js';

dotenv.config({path:"../.env"});
const app = express();

app.use(json());
app.use(cors());

app.get('/', async (req, res) => {
    try {
        const result = await connection.query('SELECT * FROM clients');
        const results = { results: (result) ? result.rows : null };
        res.send(results);
    } catch (err) {
        console.error(err);
    }
});

app.post("/cadastro", async (req, res) => {})

app.get("/busca/ddd", async (req, res) => {})

app.get("/busca/nome", async (req, res) => {})

app.put("/editar/:id", async (req, res) => {})

app.delete("/excluir/:id", async (req, res) => {})
const port = process.env.PORT || 3000;
const nome = process.env.NOME || "Teste Assertiva";

app.listen(port, () => {
    console.log(`${nome} on Port: ${port}`);
});