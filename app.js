import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
};

const messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2',
  },
};

// Set up Express app
const app = express();

// Listen for requests
app.listen(3000);

// Middleware & static files
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register View Engine (EJS)
app.set('view engine', 'ejs');

app.get('/users', (req, res) => res.send(Object.values(users)));

app.get('/users/:userId', (req, res) => res.send(users[req.params.userId]));

app.get('/messages', (req, res) => res.send(Object.values(messages)));

app.get('/messages/:messageId', (req, res) =>
  res.send(messages[req.params.messageId])
);

app.post('/messages', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
  };

  messages[id] = message;

  return res.send(message);
});
