const express = require('express');

const db = require("../db.js")

const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        const limit = parseInt(req.query.limit || 10)
        const uploaded = await db.getUploaded(limit)

        res.json(uploaded)
    })
    .post(async(req, res) => {
        const uploaded = req.body;
        uploaded.time = Date.now()

        const insertId = await db.insertUploaded(uploaded)

        res.sendStatus(200)
    })

module.exports = router;