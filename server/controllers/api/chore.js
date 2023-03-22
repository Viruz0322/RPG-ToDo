const router = require("express").Router();
const { Chore, User } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const dbRes = await Chore.create(req.body.todo);
    await User.findByIdAndUpdate(req.body.user.userId, {
      $push: { chores: dbRes._id },
    });
    console.log("db res", dbRes);
    res.json({ success: true });
  } catch (err) {
    console.log("ERROR creating chore", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    if (!req.body.user) return res.json({ success: false });
    const dbRes = await User.findById(req.body.user.userId).populate("chores");
    console.log("db res", dbRes, "GET ROUTE");
    res.json({ success: true, data: dbRes.chores });
  } catch (err) {
    console.log("ERROR creating chore", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const dbRes = await Chore.findOneAndRemove({ _id: req.params.id });
    console.log("db res", dbRes, "_______DELETE-------");
    res.json({ success: true, data: dbRes });
  } catch (err) {
    console.log("ERROR creating chore", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
