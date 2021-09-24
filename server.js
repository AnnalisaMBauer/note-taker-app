const express = require("express");
const path = require("path");
const apiRoutes = require('./routes/apiRoutes')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// links to my assets
app.use(express.static("public"));

// page will load with index.html
// html routes
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// then with notes.html
// html routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.use("/api", apiRoutes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}  🚀`)
);
