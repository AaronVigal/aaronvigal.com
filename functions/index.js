const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const engines = require('consolidate');

const firebaseApp = firebase.initializeApp(functions.config().firebase);

const app = express();
app.engine('hbs', engines.handlebars);
app.set('views', '../public/reveal.js');
app.set('view engine', 'hbs');

app.get('/slides', (request, response) => {
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    response.render('index', { presentations });
});

exports.app = functions.https.onRequest(app);
