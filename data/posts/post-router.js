const express = require('express');

const db = require('../dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts')
    .then(result => {
        res.json(result);
    })
    .catch(error => {
        res.status(500).json({
            message: 'An error occured somewhere' + error.message
        })
    });
});


module.exports = router;