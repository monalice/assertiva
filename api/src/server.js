import express, {json} from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: 'json' };
import dotenv from "dotenv";
import cors from "cors"
import clientsRouters from "./routers/clients.routers.js"

dotenv.config({path:"../.env"});
const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(json());
app.use(cors());

app.use(clientsRouters)

const port = process.env.PORT || 3000;
const nome = process.env.NOME || "Teste Assertiva";

app.listen(port, () => {
    console.log(`${nome} listen on Port: ${port}`);
});