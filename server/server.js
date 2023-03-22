const express = require("express");
const path = require("path");
const routes = require("./controllers");
const db = require("./config/connection");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./controllers/api/auth");
const jwt = require("jsonwebtoken");
//middleware to decode jwt from payload,
const decode = (req, res, next) => {
  console.log("DECODING", req.body);
  try {
    if (!req.headers.token) {
      const user = jwt.verify(req.body.user, "your-secret-key");
      console.log("Decoded", user);
      req.body.user = user;
    } else {
      const user = jwt.verify(req.headers.token, "your-secret-key");
      console.log("Decoded", user);
      req.body.user = user;
    }
  } catch (err) {
    console.log(err);
    req.body.user = null;
  }

  next();
};
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(decode);
app.use("/api", authRoutes);
app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});
//maybe work please?

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
