import { Router } from 'express';
import {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} from '../../controllers/userController.js';

const router = Router();

// /api/users
router.route('/')
    .get(getUsers)     // Get all users
    .post(createUser); // Create a user

// /api/users/:id
router.route('/:id')
    .get(getUserById)    // Get single user
    .put(updateUser)     // Update user
    .delete(deleteUser); // Delete user

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend)     // Add friend
    .delete(removeFriend); // Remove friend

export { router as userRoutes };
