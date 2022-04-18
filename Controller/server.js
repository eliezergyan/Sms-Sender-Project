const express =  require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const loginRouter = require("./routes/loginRoute");


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/login', loginRouter);

app.get('/', (req, res) => {
    res.json({"message": "Hi there"});
});





app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});