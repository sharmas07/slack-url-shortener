const validUrl = require('valid-url');

function isValidURL(url) {
    url = url.replace(/[<>]/g, '');
    return validUrl.isUri(url);
}

module.exports = { isValidURL };
