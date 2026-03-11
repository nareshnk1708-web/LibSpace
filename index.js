import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import bookRoutes from "./routes/book.route.js";

const app = express();

app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/bookapp")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

app.use("/api", userRoutes);
app.use("/api", bookRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});