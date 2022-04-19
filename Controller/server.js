const express =  require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const loginRouter = require("./routes/loginRoute");
const signupRoute = require("./routes/signupRoute");
const messageRoute = require("./routes/messageRoute");
const templateRoute = require("./routes/templateRoute");


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/login', loginRouter);

app.use('/signup', signupRoute);

app.use('/messages', messageRoute);

app.use('/templates', templateRoute);

app.get('/', (req, res) => {
    res.json({"message": "welcome"});
})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});