const functions = require("firebase-functions");

const app = require("express")();

const FBAuth = require('./ulti/fbAuth');
// const firebase = require('firebase');
// firebase.initializeApp(config);

const { getAllScreams, postOneScream } = require('./handlers/screams');
const {signup, login} = require('./handlers/users');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// Scream route
app.get("/screams", getAllScreams);

// POST one scream
app.post("/scream", FBAuth, postOneScream);

// Signup Function
app.post("/signup", signup);

//Login Function
app.post("/login", login);

// Function for Authorization 


// exports.getScreams = functions.https.onRequest((req, res) => {

// });



// Check Email must be in the correct form. Ex: user@email.com




// https://baseurl.com/api/something
exports.api = functions.region("asia-east2").https.onRequest(app);
