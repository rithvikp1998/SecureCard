'use strict'

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('login.html');
});

router.get('/dashboard.html', (req, res, next) => {
	// verify session
	next();
});

router.get('/*', (req, res, next) => {
	var regex = /(server\/server.js|(login|dashboard).html)/i;
	if(regex.test(req.url))
		next();
    // else, redirect to 404 page
});

module.exports = router;