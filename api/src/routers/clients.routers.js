import express from 'express';
import {
    postClient,
    putClient,
    deleteClient,
    getAllClient,
    getByIdClient,
    getByDDDClient,
    getByNameClient
} from "../controllers/clientsControllers.js"
import { createClientMiddleware, editClientMiddleware } from '../middlewares/clientsMiddleware.js';

const router = express.Router();

router.post('/clients', createClientMiddleware, postClient);
router.put('/clients/:id', editClientMiddleware, putClient);
router.delete('/clients/:id', deleteClient);
router.get('/clients', getAllClient);
router.get('/clients/:id', getByIdClient);
router.get('/clients/filter/ddd/:ddd', getByDDDClient);
router.get('/clients/filter/nome/:nome', getByNameClient);

export default router;