const URLModel = require("../models/urlModel");
const { generateShortUniqueCode } = require("../utils/shortCodeGenerator");

const redirectURL = async (req, res) => {
    const { code } = req.params;
    const url = await URLModel.findOne({
        urlCode: code
    })
    if (url) {
        return res.redirect(url.longUrl);
    }
    else{
        return res.status(404).json('No URL Found');
    }
}

const shorten = async (actual_url) => {
    let generatedCode;
    generatedCode = await generateShortUniqueCode();
    const shortUrl = `${process.env.BASE_URL}/${generatedCode}`;

    const newURL = new URLModel({
        urlCode: generatedCode,
        longUrl: actual_url,
        shortUrl,
    });
    await newURL.save();
    console.log(newURL);
    return newURL.shortUrl;
}

module.exports = { shorten, redirectURL };