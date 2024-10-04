const redis = require('redis');

// Redis 클라이언트 생성
const redisHandle = redis.createClient({
  host: 'localhost',  
  port: 6379          
});

// Redis 오류 처리
redisHandle.on('error', (err) => {
  console.error('Redis Error: ', err);
});

// Redis 연결 성공 메시지
redisHandle.on('connect', () => {
  console.log('Connected to Redis server');
});

module.exports = redisHandle;
