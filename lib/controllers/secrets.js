const Secret = require('../models/Secret');
const { Router } = require('express');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const secret = await Secret.insert(req.body);

      res.json(secret);
    } catch (error) {
      next(error);
    }
  });
