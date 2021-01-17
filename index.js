const config = require("./config.json")

const bodyparser = require('body-parser');
const express = require('express');
const morgan = require('morgan')
const cors = require("cors")

const app = express();

app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal'])
app.use(morgan('common'))
morgan.token('remote-addr', function (req) {
    return req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || 
        req.ip ||
        req._remoteAddress ||
        (req.connection && req.connection.remoteAddress) ||
        undefined;
});
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
if (config.debug) {
    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true
    }))
}

function route(name) {
    const mod = require(`./src/routes/${name}.js`)
    app.use(`/${name}`, mod)
}

route("status")
route("ipStatus")
route("uploaded")
route("ongoing")

app.listen(config.port, function () {
    console.log('app listening on port ' + config.port + '!');
});