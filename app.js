const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Swagger 관련 추가
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger 설정
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'EliceStagram API',
      version: '1.0.0',
      description: 'API documentation for EliceStagram',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./route/*.js'], // API 문서를 주석으로 자동 생성할 파일 경로
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 기존 라우트
const userRoute = require('./route/userRoute');
const feedRoute = require('./route/feedRoute');  
const commentRoute = require('./route/commentRoute');
const notificationRoute = require('./route/notificationRoute');

app.use('/api/user', userRoute);
app.use('/api/feed', feedRoute); 
app.use('/api/comment', commentRoute);
app.use('/api/notification', notificationRoute);

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
