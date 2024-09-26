const testAuthMiddleware = (req, res, next) => {
    // 테스트용 임의 UID 설정
    req.firebase_uid = 'test-firebase-uid';  
    next();
  };
  
  module.exports = testAuthMiddleware;
  