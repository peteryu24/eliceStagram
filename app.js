const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const userRoute = require('./route/userRoute');
const feedRoute = require('./route/feedRoute');  

app.use('/api/user', userRoute);
app.use('/api/feed', feedRoute); 

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
