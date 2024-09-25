const pool = require('../config/database');

exports.upsertUserProfile = async (firebaseUid, email, nickname, profileImageUrl) => {
  try {
    const queryText = `
      INSERT INTO users (firebase_uid, email, username, profile_image_url, created_at, updated_at)
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      ON CONFLICT (firebase_uid) 
      DO UPDATE SET 
        username = EXCLUDED.username, 
        email = EXCLUDED.email,
        profile_image_url = EXCLUDED.profile_image_url,
        updated_at = NOW();  
    `;
    await pool.query(queryText, [firebaseUid, email, nickname, profileImageUrl]);
  } catch (error) {
    throw new Error('DB Update failed: ' + error.message);
  }
};
