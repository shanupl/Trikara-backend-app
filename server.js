const express = require("express");
const app = express();
const dotenv = require('dotenv').config();
const path = require("path")
const userRoutesV1 = require("./src/routes/v1/user.route")
const { connectDB } = require('./src/config/db');
const PORT = process.env.PORT || PORT;
const axios = require("axios");
const cors = require("cors");

connectDB();

const corsOptions = {
    origin: ['http://localhost:3000', 'https://trikara-backend-app.vercel.app', 'https://trikara-frontend-fmf2siy4w-shanupls-projects.vercel.app/' ], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  };
  
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/v1/users/', userRoutesV1);

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'shanupl';
const REPO_NAME = 'Trikara-backend-app';

// Route to fetch GitHub Actions workflow runs
app.get("/api/workflows", async (req, res) => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/actions/runs`, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json'
            }
        });
        const workflows = response.data;
        console.log(workflows, "workflows---")
        res.json(workflows); // Send the workflow data to the frontend
    } catch (error) {
        console.error("Error fetching workflow runs:", error);
        res.status(500).json({ message: "Failed to fetch workflow runs" });
    }
});

app.get("/", (req, res) => {
    return res.json("App is running----")
    console.log("App is running------");
});

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
})