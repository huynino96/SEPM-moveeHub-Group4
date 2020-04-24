const functions = require("firebase-functions");

const app = require("express")();

const FBAuth = require("./ulti/fbAuth");

const { db } = require("./ulti/admin");
// const firebase = require('firebase');
// firebase.initializeApp(config);

const {
  getAllScreams,
  postOneScream,
  getScream,
  commentOnScream,
  likeScream,
  unlikeScream,
  deleteScream,
} = require("./handlers/screams");
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails,
  markNotificationRead
} = require("./handlers/users");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// Scream route
app.get("/screams", getAllScreams);

// POST one scream
app.post("/scream", FBAuth, postOneScream);

app.get("/scream/:screamId", getScream);

app.post("/scream/:screamId/comment", FBAuth, commentOnScream);
app.delete("/scream/:screamId", FBAuth, deleteScream);

//TODO: delete scream, like/unlike a scream, comment on scream

app.get("/scream/:screamId/like", FBAuth, likeScream);
app.get("/scream/:screamId/unlike", FBAuth, unlikeScream);
// Signup Function
app.post("/signup", signup);

//Login Function
app.post("/login", login);

app.post("/user/image", FBAuth, uploadImage);

app.post("/user", FBAuth, addUserDetails);

app.get("/user", FBAuth, getAuthenticatedUser);
app.get('/user/:handle', getUserDetails);
app.post('/notifications', FBAuth, markNotificationRead);

// Using Firebase On Trigger for Notification

// exports.getScreams = functions.https.onRequest((req, res) => {

// });

// https://baseurl.com/api/something
exports.api = functions.region("asia-east2").https.onRequest(app);

exports.createNotificationOnLike = functions
  .region("asia-east2")
  .firestore.document("likes/{id}")
  .onCreate((snapshot) => {
    db.doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString,
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "like",
            read: false,
            screamId: doc.id,
          })
        }else{
            return res.status(404).json({message: 'Notification not found'});
        }

      })
      .then(() => {
        return;
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });

  exports.deleteNotificationOnUnlike = functions 
  .region("asia-east2")
  .firestore.document("likes/{id}")
  .onDelete((snapshot) => {
      db.doc(`/notifications/${snapshot.id}`)
      .delete()
      .then(() => {
          return;
      })
      .catch(err => {
          console.error(err);
          return;
      })
  })

exports.createNotificationOnComment = functions
  .region("asia-east2")
  .firestore.document("comments/{id}")
  .onCreate((snapshot) => {
    db.doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString,
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "comment",
            read: false,
            screamId: doc.id,
          });
        } else{
            return res.status(404).json({message: "Notification Not Found"});
        }
        
      })
      .then(() => {
        return;
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });

// Deployed API URL: https://asia-east2-socialapp-32fb9.cloudfunctions.net/api/
