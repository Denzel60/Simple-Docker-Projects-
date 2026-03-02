import express from "express";
import config from "dotenv";

import pkg from "@prisma/client";
const { PrismaClient } = pkg;

config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Create User
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await prisma.user.create({
      data: { name, email }
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Users
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
