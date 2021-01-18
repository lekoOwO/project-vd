const express = require('express');

const router = express.Router();

let ongoing = {};

router.route('/')
    .get(async (req, res) => {
        res.json(ongoing)
    })
    .post(async(req, res) => {
        const data = req.body;
        data.time = Date.now()
        ongoing[data.id] = data;

        res.sendStatus(200)
    })
    .delete((async(req, res) => {
        const data = req.body;
        delete ongoing[data.id];

        res.sendStatus(204)
    }))

module.exports = router;