import { Request, Response } from 'express';
import { Thoughts, reactionSchema } from '../models/index.js';


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

export const createCourse = async (req: Request, res: Response) => {
    const { course } = req.body;
    try {
      const newCourse = await Course.create({
        course
      });
      res.status(201).json(newCourse);
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

/**
 * PUT Course based on id /courses/:id
 * @param object id, username
 * @returns a single Course object
*/
export const updateCourse = async (req: Request, res: Response) => {
    try {
      const course = await Course.findOneAndUpdate(
        { _id: req.params.courseId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!course) {
        res.status(404).json({ message: 'No course with this id!' });
      }

      res.json(course)
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

  /**
 * DELETE Course based on id /courses/:id
 * @param string id
 * @returns string 
*/
export const deleteCourse = async (req: Request, res: Response) => {
    try {
      const course = await Course.findOneAndDelete({ _id: req.params.courseId});
      
      if(!course) {
        res.status(404).json({
          message: 'No course with that ID'
        });
      } else {
        await Student.deleteMany({ _id: { $in: course.students } });
        res.json({ message: 'Course and students deleted!' });
      }
      
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };
