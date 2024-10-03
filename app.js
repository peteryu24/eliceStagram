const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const userRoute = require('./route/userRoute');
const feedRoute = require('./route/feedRoute');  
const commentRoute = require('./route/commentRoute');
const notificationRoute = require('./route/notificationRoute');

app.use('/api/user', userRoute);
app.use('/api/feed', feedRoute); 
app.use('/api/comment',commentRoute);
app.use('/api/notification',notificationRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
