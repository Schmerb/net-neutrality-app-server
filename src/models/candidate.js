'use strict';

const mongoose = require('mongoose');
const gender   = require('gender');

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
    imageURL: {
        type: String
    },
    'house-senate': {
        type: String,
        required: true
    }
}

// API Res
function apiRepr () {
    let imageURL = this.imageURL;
    if(!imageURL || imageURL === '' || !imageURL.includes('http')) {
        imageURL = getDefaultImage(this.firstName, this.lastName);
    }

    let district;
    if(this['house-senate'] === 'senate') {
        district = 'null';
    } else {
        district = this.district || 'unknown';
    }
    return {
        id: this._id,
        firstName: this.firstName || '',
        lastName: this.lastName || '',
        state: this.state || '',
        district: district,
        party: this.party || '',
        campaignWebsite: this.campaignWebsite || '',
        supportsNetNeutrality: this.supportsNetNeutrality || 'unknown',
        source: this.source || '',
        imageURL: imageURL,
        'house-senate': this['house-senate'],
    };
}

//
// Returns default image url depending if candidate
// name is most likely male or female
//
function getDefaultImage(fname, lname) {
    let p = gender.guess(`${fname} ${lname}`);
    return p.gender === 'female' ? 
            'https://upload.wikimedia.org/wikipedia/commons/5/53/Blank_woman_placeholder.svg'
            :
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Upload_free_image_notext.svg/2000px-Upload_free_image_notext.svg.png';
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