import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import paperRoutes from "./routes/paperRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/paper", paperRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
