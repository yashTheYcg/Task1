const firebase = require('firebase-admin');
const credentials = require('./key.json');

// connection
firebase.initializeApp({ credential: firebase.credential.cert(credentials) })
const db = firebase.firestore();

// creating the collection
const Item = db.collection("Items");

module.exports = Item;