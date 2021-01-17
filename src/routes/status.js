const express = require('express');

const db = require("../db.js")

const router = express.Router();

router.route('/')
    .get(async(req, res) => {
        const status = await db.getStatus()

        res.json(status)
    })
    .post(async(req, res) => {
        const status = { data: req.body };
        status.time = Date.now()

        const insertId = await db.insertStatus(status)

        res.sendStatus(200)
    })

module.exports = router;