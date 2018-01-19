'use strict';

const express    = require('express'),
      bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());


router.get('/', (req, res) => {
    res.status(200).render('index');
})

module.exports = { router };