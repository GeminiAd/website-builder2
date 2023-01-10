const router = require('express').Router();
const {
	addProject,
	findAllProjects,
	// deleteProject
} = require('../../controllers/projectController');

const { authMiddleware } = require('../../utils/auth');

router.route('/').post(addProject); //authMiddleware,

router.route('/').get(authMiddleware, findAllProjects);

// router.route('/:projectId').delete(authMiddleware, deleteProject); 

module.exports = router;