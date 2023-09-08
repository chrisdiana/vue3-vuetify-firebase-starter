/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest, onCall, HttpsError} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const dotenv = require('dotenv');

dotenv.config();

exports.foo = onCall({timeoutSeconds: 300}, async (req) => {

	if (!req.auth) {
    throw new functions.https.HttpsError("unauthenticated", "You must be authenticated");
  }
  
  const data = req.data;

  return {
  	result: {
  		test: 123,
  	},
  	success: true,
  };
});