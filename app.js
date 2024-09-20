const express = require('express');
const app = express();
const port = 3000;

// 미들웨어 설정
app.use(express.json());

// 라우팅 설정
const userRoute = require('./route/userRoute');
app.use('/users', userRoute);

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
