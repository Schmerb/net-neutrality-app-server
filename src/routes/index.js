'use strict';

const express                       = require('express'),
      bodyParser                    = require('body-parser'),                 
      { checkSessionCookieVisited } = require('services/cookie-check');
      
const router = express.Router();
router.use(bodyParser.json());


const { router: apiRouter }  = require('./apiRouter');
const { router: docsRouter } = require('./docsRouter');

// API
router.use('/api/v1', apiRouter);

// DOCS
router.use('/docs', docsRouter);



module.exports = router;
