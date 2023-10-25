const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users.route');
const authRoute = require('./routes/auth.route');

dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDb was connected!');
});

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.get("/", (req, res) => {
    res.send({message: 'Welcome guys!'});
})

app.listen(9900, () => {
    console.log('Backend is running!');
});
