require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const authRouter = require('./routes/authRouter');
const listenRouter = require('./routes/listenRouter');
const subscriptionRouter = require('./routes/subscriptionRouter');
const eventRouter = require('./routes/eventRouter');

const app = express();

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());

// Routes
app.use('/listen', listenRouter);
app.use('/events', eventRouter);
app.use('/subscriptions', subscriptionRouter);
app.use('/', authRouter);

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
  console.log(`Listening on port ${server.address().port}`);
});
