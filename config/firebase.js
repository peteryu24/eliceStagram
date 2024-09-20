const admin = require('firebase-admin');
const serviceAccount = require('../path-to-your-serviceAccountKey.json'); // 서비스 계정 키 경로

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
