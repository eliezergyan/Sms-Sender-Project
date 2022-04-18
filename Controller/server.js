import express from "express";
import cors from "cors";

app.use(cors());
app.use(express.json());

const app = express();
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});