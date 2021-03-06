const Secret = require('../models/Secret');
const { Router } = require('express');
const authorize = require('../middleware/authorize');

module.exports = Router()
  .post('/', authorize, async (req, res, next) => {
    try {
      const secret = await Secret.insert(req.body);

      res.json(secret);
    } catch (error) {
      next(error);
    }
  })

  .get('/', authorize, async (req, res, next) => {
    try {
      const secrets = await Secret.getAllSecrets();

      res.json(secrets);
    } catch (error) {
      next(error);
    }
  });
