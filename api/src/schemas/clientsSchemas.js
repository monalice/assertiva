import joi from 'joi';

const schemaClients = joi.object({
  cpf: joi.string().trim().length(11).regex(/^\d{11}$/).required(),
  nome: joi.string().trim().min(3).max(100).required(),
  celular: joi.string().trim().length(11).regex(/^\d{2}\d{9}$/).required(),
  celular2: joi.string().trim().length(11).regex(/^\d{2}\d{9}$/),
  email: joi.string().trim().max(100).regex(/^[^@\s]{2,}@[^@\s]{2,}\.[^@\s]{2,}$/).required(),
  email2: joi.string().trim().max(100).regex(/^[^@\s]{2,}@[^@\s]{2,}\.[^@\s]{2,}$/),
});

const schemaClient = joi.object({
  nome: joi.string().trim().min(3).max(100),
  celular: joi.string().trim().length(11).regex(/^\d{2}\d{9}$/),
  celular2: joi.string().trim().length(11).regex(/^\d{2}\d{9}$/),
  email: joi.string().trim().max(100).regex(/^[^@\s]{2,}@[^@\s]{2,}\.[^@\s]{2,}$/),
  email2: joi.string().trim().max(100).regex(/^[^@\s]{2,}@[^@\s]{2,}\.[^@\s]{2,}$/),
});

export { schemaClients, schemaClient };