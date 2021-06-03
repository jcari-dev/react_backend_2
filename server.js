//Dependencies

// get .env variables
require("dotenv").config();

//pull port from .env
const {PORT = 3000, MONGODB_URL} = process.env;

const express = require("express");

const app = express();

const mongoose = require("mongoose");

const cors = require("cors");

const morgan = require("morgan");
//data base connection

//test connection 
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

// upon db connected

mongoose.connection
    .on("open", () => console.log("You're connected to mongoose"))
    .on("close", () => console.log("You're disconnected from mongoose"))
    .on("error", (error) => console.log(error));


//models
const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String
});

const People = mongoose.model("People", PeopleSchema)

//middleware

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//routes

//test route
app.get('/', (req, res) => {
    res.send("hello world");
})
//index route

app.get("/people", async (req, res) =>{
    try{
        //send all people
        res.json(await People.find({}))
    
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

//create route
app.post("/people", async (req, res) =>{
    try{
        //send all people
        res.json(await People.create(req.body));

    } catch (error){
        //send error
        res.status(400).json(error)
    }
});

//update route
app.put("/people/:id", async (req, res) =>{
    try{
        //send all people
        res.json(
            await People.findByIdAndUpdate(req.params.id, req.body, {new: true})
        );
    } catch (error){
        //send error
        res.status(400).json(error)
    }
});

// delete route
app.delete("/people/:id", async (req, res) => {
    try{
        //send all people
        res.json(await People.findByIdAndRemove(req.params.id));
    } catch (error){
        //send error
        res.status(400).json(error);
    }
})

// listener
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));