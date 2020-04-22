const {db} = require('../ulti/admin');


const config = require('../ulti/config');
const firebase = require('firebase');
firebase.initializeApp(config);

const {validateSignupData, validateLoginData} = require('../ulti/validation');

exports.signup = (req, res) => {
    const newUser = {
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      handle: req.body.handle,
    };

    const {valid, errors} = validateSignupData(newUser);

    if(!valid){
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
        }
        if (err.code === 'auth/weak-password'){
            return res.status(400).json({password: 'Password must content both characters and numbers'})
        }
        else {
          return res.status(500).json({ error: err.code });
        }
      });
  }



  exports.login = (req, res) => {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };

    const {valid, errors} = validateLoginData(user);

    if(!valid){
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
  }