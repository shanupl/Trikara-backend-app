const express = require("express");
const app = express();
const dotenv = require('dotenv').config();
const path = require("path")
const userRoutesV1 = require("./src/routes/v1/user.route")
const { connectDB } = require('./src/config/db');
const PORT = process.env.PORT || PORT;

connectDB();

app.use(express.json());

app.use('/api/v1/users/', userRoutesV1);

app.get("/", (req, res) => {
    return res.json("App is running----")
    console.log("App is running------");
});

app.listen(PORT, () => {
    console.log(`Server is running at PORT 4001 ${PORT}`);
})