// thanks to https://howtofirebase.com/save-and-query-firebase-data-ed73fb8c6e3a
const firebase = require("firebase-admin");

const serviceAccount = require("./turappen-leaderboard-firebase-adminsdk-juf2a-d16e7b6e8f.json");

firebase.initializeApp({
	credential: firebase.credential.cert(serviceAccount),
	databaseURL: "https://turappen-leaderboard.firebaseio.com"
});

const ref = firebase.app().database().ref();

module.exports = {
	firebase,
	ref
}