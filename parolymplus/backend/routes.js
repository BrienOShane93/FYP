const express = require('express');
const checkAuth = require('./middleware/check-auth');

const athletesController = require('./controllers/athletes-controller');
const memberController = require('./controllers/member-controller');
const trainerController = require('./controllers/trainer-controller');

const router = express.Router();

router.get('/', athletesController.getAthletes);
router.post('/login', trainerController.login);
router.post('/signup', trainerController.signup);

router.use(checkAuth);

router.post('/checkout', memberController.addMember);
router.get('/members', memberController.getAllMembers);
router.get('/members/:uid', memberController.getMembersByTrainerId);

router.get('/trainers/:uid', trainerController.getTrainerById);
router.put('/updatetrainer/:uid', trainerController.updateTrainer);
router.delete('/deletetrainer/:uid', trainerController.deleteTrainer);

module.exports = router;
