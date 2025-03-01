import { Request, Response } from 'express';
import User from '../models/User.js';
import Thought from '../models/Thought.js';

  // GET all users
  export const getUsers = async (_req: Request, res: Response) => {
    try {
      const users = await User.find().populate('thoughts').populate('friends');
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching users', error: err });
    }
  }

  // GET single user by ID
  export const getUserById = async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching user', error: err });
    }
  }

  // POST create new user
  export const createUser = async (req: Request, res: Response) => {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(400).json({ message: 'Error creating user', error: err });
    }
  }

  // PUT update user by ID
  export const updateUser = async (req: Request, res: Response) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: 'Error updating user', error: err });
    }
  }

  // DELETE remove user and associated thoughts
  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      // Delete associated thoughts
      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      res.json({ message: 'User and associated thoughts deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting user', error: err });
    }
  }

  // POST add friend
  export const addFriend = async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error adding friend', error: err });
    }
  }

  // DELETE remove friend
  export const removeFriend = async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error removing friend', error: err });
    }
  }
