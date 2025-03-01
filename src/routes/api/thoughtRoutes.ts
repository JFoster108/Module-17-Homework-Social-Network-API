import { Router } from 'express';
import {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} from '../../controllers/thoughtController.js';

const router = Router();

// /api/thoughts
router.route('/')
    .get(getThoughts)     // Get all thoughts
    .post(createThought); // Create thought

// /api/thoughts/:id
router.route('/:id')
    .get(getThoughtById)   // Get single thought
    .put(updateThought)    // Update thought
    .delete(deleteThought); // Delete thought

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction); // Add reaction

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction); // Remove reaction

export { router as thoughtRoutes };
