const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 8081;

app.use((req, res, next) => {
  if (req.path.endsWith(".js")) {
    res.setHeader("Content-Type", "text/javascript");
  }
  next();
});

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "../public")));

// For all other routes, send the public/index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});




