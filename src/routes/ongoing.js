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
        ongoing[data.title] = data;

        res.sendStatus(200)
    })
    .delete((async(req, res) => {
        const data = req.body;
        delete ongoing[data.title];

        res.sendStatus(204)
    }))

module.exports = router;