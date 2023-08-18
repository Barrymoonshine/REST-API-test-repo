import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import models from './models/index.js';
import routes from './routes';

// Set up Express app
const app = express();

// Listen for requests
app.listen(3000);

// Middleware & static files
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

// Register View Engine (EJS)
app.set('view engine', 'ejs');
app.get('/session', (req, res) =>
  res.send(req.context.models.users[req.context.me.id])
);

app.get('/users', (req, res) =>
  res.send(Object.values(req.context.models.users))
);

app.get('/users/:userId', (req, res) =>
  res.send(req.context.models.users[req.params.userId])
);

app.get('/messages', (req, res) =>
  res.send(Object.values(req.context.models.messages))
);

app.get('/messages/:messageId', (req, res) =>
  res.send(req.context.models.messages[req.params.messageId])
);

app.post('/messages', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };

  req.context.models.messages[id] = message;

  return res.send(message);
});

app.delete('/messages/:messageId', (req, res) => {
  const { [req.params.messageId]: message, ...otherMessages } =
    req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});
