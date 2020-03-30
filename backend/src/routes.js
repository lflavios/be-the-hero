const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const validation = require('./utils/validation');

const OngController = require('./controllers/OngController');
const CasosController = require('./controllers/CasosController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    nome: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    cidade: Joi.string().required(),
    uf: Joi.string().length(2),
  })
}), OngController.create);

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown()
}), ProfileController.index);

routes.get('/casos', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), CasosController.index);

routes.post('/casos', CasosController.create);

routes.delete('/casos/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), CasosController.delete);

module.exports = routes;