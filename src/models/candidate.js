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
    imgUrl: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Bob_Casey%2C_official_Senate_photo_portrait%2C_c2008.jpg'
    },
    'house-senate': {
        type: String,
        required: true
    }
}

// API Res
function apiRepr () {
    if(this._id.toString() === '5a5bda201a75bbcbb139cf6c') {
        this.imgUrl = 'http://www.kellyforussenate.com/images/happybrian.jpg';
    }
    if(this._id.toString() === '5a5bda201a75bbcbb139cf6d') {
        this.imgUrl = 'https://res.cloudinary.com/crowdpac/image/upload/c_fill,f_auto,g_xy_center,h_160,q_auto,w_220,x_200,y_171/v1492124616/candidates/cand5838851ab0c132cb6c466d38';
    }
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
        imgUrl: this.imgUrl,
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