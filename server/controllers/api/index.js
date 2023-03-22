const router = require('express').Router();
const choreRoutes = require("./chore");

router.use('/chore', choreRoutes);
router.use("/auth", require("./auth"));

module.exports = router;