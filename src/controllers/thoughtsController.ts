import { Request, Response } from 'express';
import { Thoughts, User } from '../models/index.js';


export const getAllThoughts = async(_req: Request, res: Response) => {
    try {
        const thoughts = await Thoughts.find();
        res.json(thoughts);
    } catch(error: any){
        res.status(500).json({
            message: error.message
        });
    }
}

export const getThoughtsById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
      const thoughts = await Thoughts.findById(thoughtId);
      if(thoughts) {
        res.json(thoughts);
      } else {
        res.status(404).json({
          message: 'Thought not found'
        });
      }
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };

export const createThought = async (req: Request, res: Response) => {
    const { thought, username, userId } = req.body;
    try {
      const newThought = await Thoughts.create({
        thought, username
      });
      const updateUser = await User.findByIdAndUpdate(
        userId,
        { $push: { thoughts: newThought._id } },
        { new: true, runValidators: true }
      );
      if (!updateUser) {
        res.status(404).json({
          message: 'No user with this id!'
        });
      }
      res.status(201).json({
        message: 'Thought created successfully',
        thought: newThought,
        user: updateUser
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };


export const updateThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought)
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

export const deleteThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thoughts.findOneAndDelete({ _id: req.params.thoughtId});
      
      if(!thought) {
        res.status(404).json({
          message: 'No thoughts with that ID'
        });
      } 
        if (thought) {
          await User.updateMany({ thoughts: thought._id }, { $pull: { thoughts: thought._id } });
          res.json({ message: 'Thoughts and removed from user!' });
        }
      
      
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };


export const addReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        return res.json(thought);
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const removeReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        return res.json(thought);
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
};