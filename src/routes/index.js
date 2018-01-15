'use strict';

const express                       = require('express'),
      bodyParser                    = require('body-parser'),                 
      { checkSessionCookieVisited } = require('services/cookie-check');
      
const router = express.Router();
router.use(bodyParser.json());


// controllers
const mainController      = require('controllers/mainController');
const candidateController = require('controllers/candidateController');


router.get('/', mainController.getIndex);

router.get('/candidates/all',    candidateController.getAllCandidates);
router.get('/candidates/house',  candidateController.getHouseCandidates);
router.get('/candidates/senate', candidateController.getSenateCandidates);

module.exports = router;
