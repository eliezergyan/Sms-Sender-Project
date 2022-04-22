const express =  require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const loginRouter = require("./Controller/routes/loginRoute");
const signupRoute = require("./Controller/routes/signupRoute");
const messageRoute = require("./Controller/routes/messageRoute");
const templateRoute = require("./Controller/routes/templateRoute");
const path = require('path');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/login', loginRouter);

app.use('/signup', signupRoute);

app.use('/messages', messageRoute);

app.use('/templates', templateRoute);

app.get('/gifts', (req, res) => {
    res.json({"message": "Gifts delivered"})
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});