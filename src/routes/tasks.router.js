const express = require('express');
const router = express.Router();
const {
    getAllTasks,
    getTaskById,
    updateTaskById,
    createTask,
    deleteTaskById
} = require('../controllers/tasks.controllers')

router.get('/tasks',getAllTasks);
router.get('/tasks/:id',getTaskById);
router.put('/tasks/:id',updateTaskById);
router.post('/tasks', createTask);
router.delete('/tasks/:id', deleteTaskById);

module.exports = router;