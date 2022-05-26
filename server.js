const {
    response
} = require('express');
const express = require('express');
const app = express();
const port = 3000;
const log = require('log');

const sendResponse = (res = response, body = {}, statusCode = 200, message = null, error = null) => {
    let state = statusCode < 400 ? 'success' : statusCode >= 400 ? 'failed' : 'error';
    if (statusCode < 400) {
        state = 'success'
    } else if (statusCode >= 400) {
        state = 'error'
        body.error = error;
    }
    if (message) {
        body.message = message;
    }
    return res.status(statusCode).json(body)
}

app.get('/', (req, res) => {
    log.debug('Received new Request', req);
    // const response = 'Hello World!!\n' + JSON.stringify(req, null, 2);
    return sendResponse(res, req, 200, 'Hello World!');
});

app.get('/login', (req, res) => {
    const message = 'callback worked, handling request';
    log.info(message, req);
    return sendResponse(res, req, 200, message)
});

app.get('/oauth2callback', (req, res) => {
    const response = {
        message: 'callback worked, handling request',
        request: req.body
    }
    res.send('Handled Callback:\n' + JSON.stringify(response, null, 2));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});