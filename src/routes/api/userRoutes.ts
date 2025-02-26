import { Router } from 'express';
import userController from '../../controllers/userController';

const router = Router();

// /api/users
router.route('/')
  .get(userController.getUsers)     // Get all users
  .post(userController.createUser); // Create a user

// /api/users/:id
router.route('/:id')
  .get(userController.getUserById)    // Get single user
  .put(userController.updateUser)     // Update user
  .delete(userController.deleteUser); // Delete user

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(userController.addFriend)     // Add friend
  .delete(userController.removeFriend); // Remove friend

export default router;
