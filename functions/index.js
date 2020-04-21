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

// Function for Authorization 

const FBAuth = (req, res, next) => {
    let idToken;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('No token found');
        return res.status(403).json({error: 'Unauthorized'});
    }

    admin.auth().verifyIdToken(idToken)
    .then(decodedToken => {
        req.user = decodedToken;
        console.log(decodedToken);
        return db.collection('users')
        .where('userId', '==', req.user.uid)
        .limit(1)
        .get();
    })
    .then(data => {
        req.user.handle = data.docs[0].data().handle;
        return next();
    })
    .catch(err => {
        console.error('Error while verifying token', err);
        return res.status(403).json(err);
    })
}


// exports.getScreams = functions.https.onRequest((req, res) => {

// });

// POST one scream

app.post("/scream", FBAuth, (req, res) => {
  if (req.body.body.trim() === '') {
    return res.status(400).json({ body: "Body must not be empty" });
  }

  const newScream = {
    body: req.body.body,
    userHandle: req.user.handle,
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

// Check Email must be in the correct form. Ex: user@email.com
const isEmail = (email) => {
  const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) {
    return true;
  } else {
    return false;
  }
};

const isEmpty = (string) => {
  if (string.trim() === "") {
    return true;
  } else {
    return false;
  }
};

// Signup Function
app.post("/signup", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  let errors = {};

  // Validate a legal email address
  if (isEmpty(newUser.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(newUser.email)) {
    errors.email = "Must be a valid email address";
  }

  // Password must not be empty
  if (isEmpty(newUser.password)) {
    errors.password = "Must not be empty";
  }

  //Password and confirm must match
  if (newUser.password !== newUser.confirmPassword) {
    errors.confirmPassword = "Password must match";
  }

  if (isEmpty(newUser.handle)) {
    errors.handle = "Must not be empty";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }
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

    // Check if email is in use or not
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email is already taken" });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
});

//Login Function
app.post("/login", (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  let errors = {};

  // Check both email and password must be entered
  if (isEmpty(user.email)) {
    errors.email = "Must not be empty";
  }
  if (isEmpty(user.password)) {
    errors.password = "Must not be empty";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })

    //Auth Password
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/wrong-password") {
        return res
          .status(403)
          .json({ general: "Wrong password, please try again" });
      } else {
        return res.status(500).json({ errror: err.code });
      }
    });
});

// https://baseurl.com/api/something
exports.api = functions.region("asia-east2").https.onRequest(app);
