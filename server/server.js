const express = require("express");
const path = require("path");
const routes = require("./controllers");
const db = require("./config/connection");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./controllers/api/auth');

app.use(cors());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', authRoutes);
app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
