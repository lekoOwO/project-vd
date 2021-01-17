const express = require('express');

const db = require("../db.js")

const router = express.Router();

router.route('/')
    .get(async(req, res) => {
        const status = await db.getIPStatus()

        res.json(status)
    })
    .post(async(req, res) => {
        const status = req.body;
        status.time = Date.now()

        const insertId = await db.insertIPStatus(status)

        res.sendStatus(200)
    })

module.exports = router;