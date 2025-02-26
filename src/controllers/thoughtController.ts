import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/User';

const thoughtController = {
  // GET all thoughts
  async getThoughts(req: Request, res: Response) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching thoughts', error: err });
    }
  },

  // GET single thought by ID
  async getThoughtById(req: Request, res: Response) {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching thought', error: err });
    }
  },

  // POST create new thought
  async createThought(req: Request, res: Response) {
    try {
      const newThought = await Thought.create(req.body);
      await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } });
      res.json(newThought);
    } catch (err) {
      res.status(400).json({ message: 'Error creating thought', error: err });
    }
  },

  // PUT update thought by ID
  async updateThought(req: Request, res: Response) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(400).json({ message: 'Error updating thought', error: err });
    }
  },

  // DELETE remove thought by ID
  async deleteThought(req: Request, res: Response) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.id);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json({ message: 'Thought deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting thought', error: err });
    }
  },

  // POST add reaction to thought
  async addReaction(req: Request, res: Response) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json({ message: 'Error adding reaction', error: err });
    }
  },

  // DELETE remove reaction from thought
  async removeReaction(req: Request, res: Response) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json({ message: 'Error removing reaction', error: err });
    }
  },
};

export default thoughtController;
