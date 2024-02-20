const crypto = require('crypto');
const URLModel = require('../models/urlModel');

const base62Alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const generateShortUniqueCode = async ()=>{
    let shortId, existingURL;
    while(true){
        shortId = generateShortId();
        existingURL = await URLModel.findOne({urlCode: shortId});

        if(!existingURL){
            break;
        }
    }
    return shortId;
}


const generateShortId = () => {
    let shortId = '';
    const length = 6;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * base62Alphabet.length);
        shortId += base62Alphabet.charAt(randomIndex);
    }

    return shortId;
};

module.exports = { generateShortId, generateShortUniqueCode };