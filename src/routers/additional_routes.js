import express from 'express';

const additional_routes = express.Router();

additional_routes.get('/', (req, res) => {
  res.send('List all users');
});

additional_routes.post('/', (req, res) => {
  res.send('Create a user');
});

additional_routes.get('/:id', (req, res) => {
  res.send(`Get user with ID ${req.params.id}`);
});


export default additional_routes;
