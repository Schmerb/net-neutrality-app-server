'use strict';

const mongoose = require('mongoose');

// generic candidate data schema
const schemaObj = {
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
    }, 
    district: {
        type: Number,
    },
    party: {
        type: String,
        required: true,
    },
    campaignWebsite: {
        type: String
    },
    supportsNetNeutrality: {
        type: String,
        required: true,
    },
    source: {
        type: String
    },
    'house-senate': {
        type: String,
        required: true
    }
}

// API Res
function apiRepr () {
    return {
        id: this._id,
        firstName: this.firstName || '',
        lastName: this.lastName || '',
        state: this.state || '',
        district: this.district || 'unknown',
        party: this.party || '',
        campaignWebsite: this.campaignWebsite || '',
        supportsNetNeutrality: this.supportsNetNeutrality || 'unknown',
        source: this.source || '',
        'house-senate': this['house-senate'],
    };
}

// Schema 
const HouseCandidateSchema  = mongoose.Schema(schemaObj);
const SenateCandidateSchema = mongoose.Schema(schemaObj);

// API response format
HouseCandidateSchema.methods.apiRepr  = apiRepr;
SenateCandidateSchema.methods.apiRepr = apiRepr;

// Modeling Schema
const HouseCandidate  = mongoose.model('HouseCandidate', HouseCandidateSchema, 'house');
const SenateCandidate = mongoose.model('SenateCandidate', SenateCandidateSchema, 'senate');


module.exports = { HouseCandidate, SenateCandidate };