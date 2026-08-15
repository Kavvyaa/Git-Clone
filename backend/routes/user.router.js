const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.get('/allUsers', userController.getAllUsers);
userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.get('/user/:id', userController.getUserProfile);
userRouter.put('/updateUser/:id', userController.updateUserProfile);
userRouter.delete('/deleteUser/:id', userController.deleteUserProfile);

module.exports = userRouter;