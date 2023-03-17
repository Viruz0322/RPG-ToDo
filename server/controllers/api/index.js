const router = require('express').Router();
const choreRoutes = require("./chore");

router.use('/chore', choreRoutes);

module.exports = router;