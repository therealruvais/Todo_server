require("dotenv").config();
require("express-async-errors");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const port = process.env.PORT || 3000;
const connectDB = require("./DB/connectDB");

const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");


const authRoute = require("./routes/authRoutes");
const taskRoute = require("./routes/taskRoutes");


const express = require("express");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://todo-client-ruvais-projects.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());



app.use("/api/user", authRoute);
app.use("/api/task", taskRoute);

app.use(notFound);
app.use(errorHandler);

// app.get("/", (req, res) => {
//   res.send("helo");
// });

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server is running at ${port}`);
    });
  } catch (error) {
    console.log("something is wrong with connection" + error);
  }
};
start();

