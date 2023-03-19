const router = require("express").Router();
const { Chore } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const dbRes = await Chore.create(req.body);
    console.log("db res", dbRes);
    res.json({ success: true });
  } catch (err) {
    console.log("ERROR creating chore", err);
    res.status(500).json({ success: false });
  }
});

router.get("/", async (req, res) => {
    try {
      const dbRes = await Chore.find();
      console.log("db res", dbRes,"GET ROUTE");
      res.json({ success: true, data:dbRes });
    } catch (err) {
      console.log("EERROR creating chore", err);
      res.json({ success: false });
    }
  });


router.get("/:id", async (req, res) => {
  try {
    const dbRes = await Chore.findOneAndRemove({_id:req.params.id});
    console.log("db res", dbRes,"_______DELETE-------");
    res.json({ success: true, data:dbRes });
  } catch (err) {
    console.log("EERROR creating chore", err);
    res.json({ success: false });
  }
});



module.exports = router;