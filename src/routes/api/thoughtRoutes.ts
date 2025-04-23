import { Router } from 'express';
const router = Router();
import {
  getAllThoughts,
  getThoughtsById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} from '../../controllers/thoughtsController.js';

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getThoughtsById)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction);
// /api/thought/:Thoughtid/reactions

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);
// /api/thought/:Thoughtid/reactions/:reactionId

export { router as courseRouter };
