'use strict';

const { HouseCandidate, SenateCandidate } = require('models/candidate');

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Returns all candidates of house and senate
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
exports.getAllCandidates = (req, res) => {
    let _res = {};
    HouseCandidate
        .find({})
        .exec()
        .then(houseCandidates => {
            _res.house = houseCandidates.map(candidate => candidate.apiRepr());
            return SenateCandidate
                .find({})
                .exec()
        })
        .then(senateCandidateas => {
            _res.senate = senateCandidateas.map(candidate => candidate.apiRepr());
            res.status(200).json({Candidates2018: _res})
        })
        .catch(err => res.status(500).json({message: 'Internal server error', err}));
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Returns all House candidates, uses queries from request
// to limit search
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
exports.getHouseCandidates = (req, res) => {
    let queries = {};
    for (let key of Object.keys(req.query)) {
        queries[key] = req.query[key];
    }
    HouseCandidate
        .find(queries)
        .exec()
        .then(houseCandidates => {
            res.status(200).json({house: houseCandidates.map(candidate => candidate.apiRepr())});
        })
        .catch(err => res.status(500).json({message: 'Internal server error', err}));
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Returns all Senate candidates, uses queries from request
// to limit search
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
exports.getSenateCandidates = (req, res) => {
    let queries = {};
    for (let key of Object.keys(req.query)) {
        key === 'district' ? res.status(300).send('Sorry, but your request contains an incorrect query param: district'):null;
        queries[key] = req.query[key];
    }
    SenateCandidate
        .find(queries)
        .exec()
        .then(senateCandidates => {
            res.status(200).json({senate: senateCandidates.map(candidate => candidate.apiRepr())});
        })
        .catch(err => res.status(500).json({message: 'Internal server error', err}));
};