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
app.get('/', (req, res) => res.send('Received a GET HTTP method'));

app.post('/', (req, res) => res.send('Received a POST HTTP method'));

app.put('/', (req, res) => res.send('Received a PUT HTTP method'));

app.delete('/', (req, res) => res.send('Received a DELETE HTTP method'));
