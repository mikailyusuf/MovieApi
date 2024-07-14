// src/index.ts
import express from "express";
import bodyParser from "body-parser";
import authRoute from "./routes/authRoute";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/api/v1/auth", authRoute);

// Protected Route Example
app.get("/protected", (req, res) => {
  res.json({ message: `Hello` });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
