const express = require("express");
const app = express();
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const multer = require("multer");
// const path = require("path");
var port = 3000;
//Route Imports:
// const authRoute = require("./routes/auth");
// const userRoute = require("./routes/users");
// const postRoute = require("./routes/posts");
// const categoryRoute = require("./routes/categories");

// dotenv.config();
// app.use(express.json());
// // app.use("/images", express.static(path.join(__dirname, "/images")));

// // mongoose
// //   .connect(process.env.MONGO_URL)
// //   .then(console.log("Connected to MongoDB"))
// //   .catch((err) => console.log(err));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

// const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   res.status(200).json("File has been uploaded");
// });
app.use("/", (req, res) => {
  res.send("Welcome to the homepage.11");
});
// app.use("/api/auth", authRoute);
// app.use("/api/users", userRoute);
// app.use("/api/posts", postRoute);
// app.use("/api/categories", categoryRoute);

app.listen(port, () => {
  console.log("Backend is running on port 8080.");
});
