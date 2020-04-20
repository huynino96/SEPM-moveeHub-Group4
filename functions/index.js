const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp()

const express = require ('express');
const app = express();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions


app.get('/screams', (req, res) => {
    admin
    .firestore()
    .collection('screams')
    .orderBy('createAt', 'desc')
    .get()
    .then((data) => {
        let screams = [];
        data.forEach(doc =>{
            screams.push({
                screamId: doc.id,
                body: doc.data().body,
                userHandle: doc.data().userHandle,
                createAt: doc.data().createAt
            });
        });
        return res.json(screams);
    })
    .catch((err)=> console.error(err));
})

// exports.getScreams = functions.https.onRequest((req, res) => {
    
// });

app.post('/scream', (req, res) => {
    const newScream = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createAt: admin.firestore.Timestamp.fromDate(new Date())
    };

    admin.firestore()
    .collection('screams')
    .add(newScream)
    .then((doc) => {
        res.json({message: `document ${doc.id} create successfully`});
        return res.json(screams);
    })
    .catch((err) => {
        res.status(500).json({error: 'something went wrong'});
        console.error(err);
    });
});

// https://baseurl.com/api/something
exports.api = functions.https.onRequest(app);