const testAuthMiddleware = (req, res, next) => {
    req.firebase_uid = 'test-firebase-uid';  
    next();
  };
  
  module.exports = testAuthMiddleware;
  