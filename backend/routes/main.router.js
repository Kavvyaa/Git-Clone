const express = require('express');
const mainRouter = express.Router();
const userRouter = require('./user.router');

mainRouter.get('/', (req, res)=>{
    res.send("connected!!");
});

mainRouter.use(userRouter);

module.exports = mainRouter;