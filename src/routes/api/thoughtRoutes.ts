import { Router } from 'express';
import thoughtController from '../../controllers/thoughtController';

const router = Router();

// /api/thoughts
router.route('/')
  .get(thoughtController.getThoughts)     // Get all thoughts
  .post(thoughtController.createThought); // Create thought

// /api/thoughts/:id
router.route('/:id')
  .get(thoughtController.getThoughtById)   // Get single thought
  .put(thoughtController.updateThought)    // Update thought
  .delete(thoughtController.deleteThought); // Delete thought

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(thoughtController.addReaction); // Add reaction

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(thoughtController.removeReaction); // Remove reaction

export default router;
