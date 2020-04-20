const functions = require("firebase-functions");
const admin = require("firebase-admin");

const app = require("express")();
admin.initializeApp();

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyA-a741PqH4V0gPPrS71FdOeArvskoOkc8",
  authDomain: "socialapp-32fb9.firebaseapp.com",
  databaseURL: "https://socialapp-32fb9.firebaseio.com",
  projectId: "socialapp-32fb9",
  storageBucket: "socialapp-32fb9.appspot.com",
  messagingSenderId: "350258055014",
  appId: "1:350258055014:web:a12607809e10a6a28eeaa7",
  measurementId: "G-L8G47Z00Y3",
};

const firebase = require("firebase");
firebase.initializeApp(config);

const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

app.get("/screams", (req, res) => {
  db.collection("screams")
    .orderBy("createAt", "desc")
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createAt: doc.data().createAt,
        });
      });
      return res.json(screams);
    })
    .catch((err) => console.error(err));
});

// exports.getScreams = functions.https.onRequest((req, res) => {

// });

app.post("/scream", (req, res) => {
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createAt: new Date().toISOString(),
  };

  db.collection("screams")
    .add(newScream)
    .then((doc) => {
      res.json({ message: `document ${doc.id} create successfully` });
      return res.json(screams);
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
});

// Signup rout
app.post("/signup", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  // TODO: Validate data

  let token, userId;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: "this handle is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
    token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })

    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email is already taken" });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
});

// https://baseurl.com/api/something
exports.api = functions.region("asia-east2").https.onRequest(app);
