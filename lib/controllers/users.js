const { Router } = require('express');

module.exports = Router()
  .post('/', async (req, res) => {
    const user = await User.insert(req.body);

    res.json(user);
  });

