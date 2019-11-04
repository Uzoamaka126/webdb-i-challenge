const express = require('express');

const db = require('../dbConfig');
// const db = require('./data/dbConfig.js');

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

router.get('/:id', async (req, res) => {
    try {
        const result = await db('accounts').where({ id: req.params.id });
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({
            message: 'An error occured somewhere' + error.message
        })
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await db('accounts')
        .insert({
            name: req.body.name,
            budget: req.body.budget,
        })
        res.json('New account with id ' + result[0] + 'has been created')
    } catch (error) {
        res.status(500).json({
            message: 'An error occured while creating a new account'
        })
    }
});

router.put('/:id', (req, res) => {
    db('accounts').where({ id: req.params.id })
    .update({
        name: req.body.name,
        budget: req.body.budget,
    })
    .then(updatedAccounts => {
        console.log(updatedAccounts);
        res.json(updatedAccounts + 'account just got changed' );
    })
    .catch(error => {
        res.status(500).json({
            message: 'Something went wrong' + error.message
        })
    })
})
module.exports = router;