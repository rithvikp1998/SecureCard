'use strict'

const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');

router.get('/', (req, res) => {
    res.redirect('login.html');
});

router.post('/register', (req, res) => {
	auth.registerUser(req.body.username, req.body.password, req.body.salt, (err, result) => {
		if (err == null){
			req.session.authenticated = true;
			console.log("User '%s' registered successfully", req.body.username);
			console.log('User authenticated');
			res.redirect('dashboard.html');
			// The client tries to redirect to dashboard on POST's success
		}
	});
})

router.post('/login', (req, res, next) => {
	auth.validateUser(req.body.username, req.body.password, (err, result) => {
		if (err == null && result == 1){
			req.session.authenticated = true;
			console.log('User authenticated');
			res.redirect('dashboard.html');
			// The client tries to redirect to dashboard on POST's success
		}
	});
})

router.get('/dashboard.html', (req, res, next) => {
	if (req.session.authenticated){
		next();
	}
	else {
		res.redirect('login.html');
	}
});

router.get('/*', (req, res, next) => {
	var regex = /(server\/server.js|(login|dashboard).html)/i;
	if(regex.test(req.url))
		next();
    // else, redirect to 404 page
});

module.exports = router;