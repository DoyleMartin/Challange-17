import { Router } from 'express';
const router = Router();
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
} from '../../controllers/userController.js';

// /api/users
router.route('/users').get(getAllUsers).post(createUser);

// /api/users/:userId
router.route('/:studentId').get(getUserById).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends
router.route('/:studentId/friends').post(addFriend);

// /api/users/:userId/friends/:friendsId
router.route('/:studentId/assignments/:assignmentId').delete(removeFriend);

export { router as userRouter} ;
