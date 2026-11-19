import express from 'express';

import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    
} from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// //real Crud operations
// router.post('/register', register)

export default router;