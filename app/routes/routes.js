'use strict'

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('index.html');
});

router.get('/*', (req, res, next) => {
	var regex = /(server\/server.js|index.html)/i;
	if(regex.test(req.url))
		next();
    // else, redirect to 404 page
});

module.exports = router;