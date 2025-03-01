// const express = require("express");
// const cors = require('cors');
import express from "express";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

import mainrouter from "./routes/index.js";

app.use("/api/v1",mainrouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

