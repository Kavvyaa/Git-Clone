const express = require('express');
const mainRouter = express.Router();
const userRouter = require('./user.router');
const repoRouter = require('./repo.router');

mainRouter.get('/', (req, res)=>{
    res.send("connected!!");
});

mainRouter.use(userRouter);
mainRouter.use(repoRouter);

module.exports = mainRouter;