import express from 'express';
import additional_routes from './additional_routes.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'CORS is working correctly for the /auth route!',
        success: true,
    });
});

router.use('/jsExercise', additional_routes);

// 404 handler
router.use((req, res, next) => {
  res.status(404).send('Resource not found');
});

// Error handler
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default router;