import { Thoughts, User } from '../models/index.js';
import { Request, Response } from 'express';


export const headCount = async () => {
    try {
        const numberOfStudents = await User.aggregate([
            { $count: "studentCount" }
        ]);
        return numberOfStudents;
    }
    catch (error) {
        console.error('Error counting students:', error);
        throw error;
    }
}


export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const students = await User.find();

        const studentObj = {
            students,
            headCount: await headCount(),
        }

        res.json(studentObj);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId)
        .populate('thoughts')
        .populate('friends');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.json(user);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email } = req.body;
        const user = await User.create({ username, email });
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No such User exists' });
        }
        await Thoughts.deleteMany({ _id: { $in: user.thoughts } });
        return res.json({ message: 'User and their thoughts successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'No such User exists' });
        }
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

export const addFriend = async (req: Request, res: Response) => {
    console.log('You are adding a friend');
    console.log(req.body);
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }

        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const removeFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { userId: req.params.userId } } },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }

        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}
