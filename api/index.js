const functions = require("firebase-functions");

const app = require("express")();

const FBAuth = require('./ulti/fbAuth');
// const firebase = require('firebase');
// firebase.initializeApp(config);

const { getAllScreams, postOneScream } = require('./handlers/screams');
const { signup, login, uploadImage } = require('./handlers/users');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// Scream route
app.get('/screams', getAllScreams);

// POST one scream
app.post('/scream', FBAuth, postOneScream);

// Signup Function
app.post('/signup', signup);

//Login Function
app.post('/login', login);

app.post('/user/image', FBAuth, uploadImage)
// Function for Authorization


// exports.getScreams = functions.https.onRequest((req, res) => {

// });

// https://baseurl.com/api/something
exports.api = functions.region("asia-east2").https.onRequest(app);

// Deployed API URL: https://asia-east2-socialapp-32fb9.cloudfunctions.net/api/
