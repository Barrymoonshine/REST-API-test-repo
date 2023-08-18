import express from 'express';

// Set up Express app
const app = express();

// Listen for requests
app.listen(3000);

// Middleware & static files
app.use(express.static('public'));

// Register View Engine (EJS)
app.set('view engine', 'ejs');

// Render a view
app.get('/users', (req, res) => res.send('GET HTTP method on user resource'));

app.post('/users', (req, res) => res.send('POST HTTP method on user resource'));

app.put('/users/:userId', (req, res) =>
  res.send(`PUT HTTP method on user/${req.params.userId} resource`)
);

app.delete('/users/:userId', (req, res) =>
  res.send(`DELETE HTTP method on user/${req.params.userId} resource`)
);
