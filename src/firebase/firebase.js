import firebase from "firebase";

var firebaseConfig = {
	apiKey: "AIzaSyBEuAaRANsB1d0mFx-vB6Cm2q6-qcoNNE0",
	authDomain: "gradngo.firebaseapp.com",
	databaseURL: "https://gradngo.firebaseio.com",
	projectId: "gradngo",
	storageBucket: "gradngo.appspot.com",
	messagingSenderId: "501654236392",
	appId: "1:501654236392:web:25cc09b28c540070b76d5d",
	measurementId: "G-NNCRZ2J31Q"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export default firebase;
export {db};