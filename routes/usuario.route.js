'use strict'

import HttpStatus from 'http-status'

const { decode } = require('jwt-simple');

module.exports = (router, app) => {
  const UsuarioDAO = app.get('dao').UsuarioDAO;

  router
    .route('/logado')
    .get((req, res) => {
      const usuarioDAO = new UsuarioDAO(app.get('models'));
      const { id } = decode(req.query.token.replace('JWT ', ''), app.get('configs').jwt.secret);

      usuarioDAO
        .getCreated(id)
        .then(response => res.status(response.statusCode).json(response.data))
        .catch(error => res.sendStatus(error.statusCode));
    });

  router
    .route('/logado/pessoa')
    .get((req, res) => {
      const usuarioDAO = new UsuarioDAO(app.get('models'))
      const usuario = req.session.id

      usuarioDAO
        .getPessoaDe(usuario)
        .then(response => res.status(response.statusCode).json(response.data))
        .catch(err => { res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY) })
    })

  router
    .route('/:id')
    .get((req, res) => {
      const usuarioDAO = new UsuarioDAO(app.get('models'));
      const { id } = req.params;

      usuarioDAO
        .getCreated(id)
        .then(response => res.status(response.statusCode).json(response.data))
        .catch(error => res.sendStatus(error.statusCode));
    })

  return router;
};