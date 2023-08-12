// Create web server
// 1. Create a web server
// 2. Create a route for GET /comments
// 3. Create a route for POST /comments
// 4. Create a route for GET /comments/:id
// 5. Create a route for PUT /comments/:id
// 6. Create a route for DELETE /comments/:id
// 7. Start and listen the web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Create web server
const app = express();

// Create a route for GET /comments
app.get('/comments', (req, res) => {
  // Read comments.json file
  const comments = JSON.parse(fs.readFileSync('comments.json'));
  // Send the comments as JSON response
  res.json(comments);
});

// Create a route for POST /comments
app.post('/comments', bodyParser.json(), (req, res) => {
  // Read comments.json file
  const comments = JSON.parse(fs.readFileSync('comments.json'));
  // Create a new comment
  const newComment = {
    id: uuidv4(),
    ...req.body,
  };
  // Add the new comment to comments
  comments.push(newComment);
  // Write comments to comments.json file
  fs.writeFileSync('comments.json', JSON.stringify(comments, null, 2));
  // Send the new comment as JSON response
  res.json(newComment);
});

// Create a route for GET /comments/:id
app.get('/comments/:id', (req, res) => {
  // Read comments.json file
  const comments = JSON.parse(fs.readFileSync('comments.json'));
  // Find comment by id
  const comment = comments.find((comment) => comment.id === req.params.id);
  // Send the comment as JSON response
  res.json(comment);
});

// Create a route for PUT /comments/:id
app.put('/comments/:id', bodyParser.json(), (req, res) => {
  // Read comments.json file
  const comments = JSON.parse(fs.readFileSync('comments.json'));
  // Find comment by id
  const comment = comments.find((comment) => comment.id === req.params.id);
  // Update the comment
  comment.name = req.body.name;
  comment.message = req.body.message;
  // Write