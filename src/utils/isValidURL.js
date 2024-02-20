const validUrl = require('valid-url');

function isValidURL(url) {
    return validUrl.isUri(url);
}

module.exports = { isValidURL };
