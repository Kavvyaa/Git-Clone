const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.get('/allUsers', userController.getAllUsers);
userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.get('/user', userController.getUserProfile);
userRouter.put('/updateUser', userController.updateUserProfile);
userRouter.delete('/deleteUser', userController.deleteUserProfile);

module.exports = userRouter;