import { Request, Response } from 'express';
import User from '../models/User';
import Thought from '../models/Thought';

const userController = {
  // GET all users
  async getUsers(req: Request, res: Response) {
    try {
      const users = await User.find().populate('thoughts').populate('friends');
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching users', error: err });
    }
  },

  // GET single user by ID
  async getUserById(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching user', error: err });
    }
  },

  // POST create new user
  async createUser(req: Request, res: Response) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(400).json({ message: 'Error creating user', error: err });
    }
  },

  // PUT update user by ID
  async updateUser(req: Request, res: Response) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: 'Error updating user', error: err });
    }
  },

  // DELETE remove user and associated thoughts
  async deleteUser(req: Request, res: Response) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Delete associated thoughts
      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      res.json({ message: 'User and associated thoughts deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting user', error: err });
    }
  },

  // POST add friend
  async addFriend(req: Request, res: Response) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error adding friend', error: err });
    }
  },

  // DELETE remove friend
  async removeFriend(req: Request, res: Response) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error removing friend', error: err });
    }
  },
};

export default userController;
