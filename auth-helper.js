var https = require('https');

var appDetails = {
    authority: 'https://login.microsoftonline.com/common',
    client_id: '85b77926-c05c-4936-95ea-8db0c579f016',
    client_secret: '6Xd8Q~2VV6OdzV1RXitXjH_A4HCUSGOI2txK3doY',
    redirect_url: 'http://localhost:3000/login',
    scopes: 'openid+https://outlook.office.com/contacts.read+offline_access'
};

//builds a redirect url based on app detail
function getAuthUrl(res) {
    return appDetails.authority + '/oauth2/v2.0/authorize' +
        '?client_id=' + appDetails.client_id +
        '&scope=' + appDetails.scopes +
        '&redirect_uri=' + appDetails.redirect_url +
        '&response_type=code';
};

//gets a token given an authorization code
function getTokenFromCode(code, callback) {
    var payload = 'grant_type=authorization_code' +
        '&redirect_uri=' + appDetails.redirect_url +
        '&client_id=' + appDetails.client_id +
        '&client_secret=' + appDetails.client_secret +
        '&code=' + code +
        '&scope=' + appDetails.scopes;

    postJson('login.microsoftonline.com',
        '/common/oauth2/v2.0/token',
        payload,
        function (token) {
            callback(token);
        });
};

//gets a new token given a refresh token
function getTokenFromRefreshToken(token, callback) {
    var payload = 'grant_type=refresh_token' +
        '&redirect_uri=' + appDetails.redirect_url +
        '&client_id=' + appDetails.client_id +
        '&client_secret=' + appDetails.client_secret +
        '&refresh_token=' + token +
        '&scope=' + appDetails.scopes;

    postJson('login.microsoftonline.com',
        '/common/oauth2/v2.0/token',
        payload,
        function (token) {
            callback(token);
        });
};

//performs a generic http POST and returns JSON
function postJson(host, path, payload, callback) {
    var options = {
        host: host,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(payload, 'utf8')
        }
    };

    var reqPost = https.request(options, function (res) {
        var body = '';
        res.on('data', function (d) {
            body += d;
        });
        res.on('end', function () {
            callback(JSON.parse(body));
        });
        res.on('error', function (e) {
            callback(null);
        });
    });

    //write the data
    reqPost.write(payload);
    reqPost.end();
};

exports.getAuthUrl = getAuthUrl;
exports.getTokenFromCode = getTokenFromCode;
exports.getTokenFromRefreshToken = getTokenFromRefreshToken;
exports.TOKEN_CACHE_KEY = 'TOKEN_CACHE_KEY';