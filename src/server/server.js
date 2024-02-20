const express = require('express');
const { redirectURL } = require('../controllers/urlController');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// routes
app.get('/ping', (req, res) => {
    res.send("pong");
});

app.get('/:code', redirectURL)

const startExpressServer = () => {
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}

module.exports = startExpressServer;