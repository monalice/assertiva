import connection from "../config/database.js";
import { schemaClients, schemaClient } from "../schemas/clientsSchemas.js";
import { STATUS_CODE } from "../utils/statusCode.js";
import { stripNonNumeric } from "../utils/strings.js"
import clients from "../repository/clientsRepository.js"

async function createClientMiddleware(req, res, next) {
    let { cpf, nome, celular, celular2, email, email2 } = req.body;
    if(
        cpf === null || cpf === undefined || typeof(cpf) !== 'string' ||
        nome === null || nome === undefined || typeof(nome) !== 'string' ||
        celular === null || celular === undefined || typeof(celular) !== 'string' ||
        email === null || email === undefined || typeof(email) !== 'string' ||
        celular.length === 0 || email.length === 0 || cpf.length === 0 || nome.length === 0
    ) {
        return res.sendStatus(STATUS_CODE.ERRORBADREQUEST)
    }

    cpf = stripNonNumeric(cpf.trim());
    celular = stripNonNumeric(celular.trim());
    celular2 = celular2 ? stripNonNumeric(celular2.trim()) : null;

    req.body = {
        cpf: cpf,
        nome: nome.trim(),
        celular: celular,
        celular2: celular2,
        email: email.trim(),
        email2: email2 ? email2.trim() : null
    }

    const valid = schemaClients.validate(req.body, {abortEarly: false});
    if(valid.errorMessage){
        const erros = validation.error.details.map((err) => err.message);
        return res.status(STATUS_CODE.ERRORBADREQUEST).send(
            `Exeto celular2 e email2, todos os campos são obrigatórios! : ${erros}`
        )
    }

    try{
        const hasClient = await connection.query(`SELECT * FROM clients WHERE cpf = $1;`, [`${cpf}`]);
        if (hasClient.rowCount > 0) {
            return  res.status(STATUS_CODE.ERRORCONFLICT).send(`Este CPF já foi cadastrado na nossa base anteriormente.`);
        }
    next();

    } catch (error) {
        console.error(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

function validateFields(nome, celular, celular2, email, email2) {
    const fields = [
        { field: 'nome', value: nome },
        { field: 'celular', value: celular },
        { field: 'celular2', value: celular2 },
        { field: 'email', value: email },
        { field: 'email2', value: email2 }
    ];

    const validFields = fields.filter((field) => {
        const { value } = field;
        return (
            value !== undefined || 
            typeof value === 'string'
        );
        }).map((field) => {
            return ({
                field: field.field,
                value: field.value
            })
        });

        return validFields.length > 0 ? validFields : null;
}

async function editClientMiddleware(req, res, next) {
    const { nome, celular, celular2, email, email2 } = req.body;

    req.body = {
        nome: nome ? nome.trim() : null,
        celular: celular ? stripNonNumeric(celular.trim()) : null,
        celular2: celular2 ? stripNonNumeric(celular2.trim()) : null,
        email: email ? email.trim() : null,
        email2: email2 ? email2.trim() : null
    };

    const validFieldsMessage = validateFields(nome, celular, celular2, email, email2);
    if (validFieldsMessage == null) {
        return res.sendStatus(STATUS_CODE.ERRORBADREQUEST);
    }

    const filteredBody = Object.keys(req.body)
    .filter(key => validFieldsMessage.some(field => field.field === key))
    .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;
    }, {});

    const validation = schemaClient.validate(filteredBody, { abortEarly: false });
    if (validation.errorMessage) {
        const errors = validation.error.details.map((err) => err.message);
        return res.status(STATUS_CODE.ERRORBADREQUEST).send(`messages: ${errors}`);
    }

    try {
        const client = await clients.getClientById(req.params.id);
        if (client) {
            const mergedBody = Object.assign({}, client);
            for (const [key, value] of Object.entries(filteredBody)) {
                if (mergedBody[key] !== undefined) {
                    mergedBody[key] = value;
                }
            }
            req.body = mergedBody;
            next();
        }
    } catch (error) {
        console.error(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export { createClientMiddleware, editClientMiddleware };
