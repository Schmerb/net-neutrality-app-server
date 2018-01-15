'use strict';

const express                       = require('express'),
      bodyParser                    = require('body-parser'),                 
      { checkSessionCookieVisited } = require('services/cookie-check');
      
const router = express.Router();
router.use(bodyParser.json());


// controllers
const mainController = require('controllers/mainController');


router.get('/', mainController.getIndex);

router.get('/candidates/all', mainController.getAllCandidates);

router.get('/candidates/house', mainController.getHouseCandidates);

router.get('/candidates/senate', mainController.getSenateCandidates);

module.exports = router;
