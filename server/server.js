require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bookRouter = require('./routes/book.route');
const userRouter = require('./routes/user.route');
const reviewRouter = require('./routes/review.route');
const { authMiddleware } = require('./middleware/jwt');


const app = express();
const port = 3000 || process.env.PORT;
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('server running');
});

app.use('/api/books', bookRouter, authMiddleware);
app.use('/api/reviews', reviewRouter, authMiddleware);
app.use('/api/users', userRouter);

app.listen(port, async () => {
    await connectDB();
    console.log(`Server is live on http://localhost:${port}`);
});