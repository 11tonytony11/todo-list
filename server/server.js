const { MongoClient } = require('mongodb')
const express = require('express');
const cors = require('cors');

const app = express()

// Init cors and json parse for POST requests
app.use(express.json())
app.use(cors())

// Connect to DB
const dbURI = "mongodb+srv://client:**********@cluster0.3vmuf.mongodb.net/TODO?retryWrites=true&w=majority";
const client = new MongoClient(dbURI)
client.connect().then(() => console.log('connected to Databae'));

// Handle login
app.post('/api/login', async function(req, res) { 
    const dbRes = await client.db("TODO").collection("users").findOne({name: req.body["user"], pass: req.body["pass"]});
    res.send(JSON.stringify({isAuth: dbRes != null}));
})

// Handle get posts request
app.get('/api/fetch/:name', async function(req, res) {
    const dbRes = await client.db("TODO").collection("tasks").find({user: req.params["name"]}).toArray();
    res.send(JSON.stringify(dbRes));
})

// Handle mark as done request
app.get('/api/update/:name/:text', async function(req, res) {
    const dbRes = await client.db("TODO").collection("tasks").updateOne({text: req.params["text"], user: req.params["name"]}, {$set: {isDone: true}});
    res.send("<p>done</p>")
})

// Handle add task request
app.get('/api/add/:name/:text', async function(req, res) {
    const dbRes = await client.db("TODO").collection("tasks").insertOne({ user: req.params.name, isDone: false, text: req.params.text})
    res.send("<p>done</p>")
})

// Get stats for specific user
app.get('/api/stats/:name', async function(req, res) {
    var stats = [0,0]
    const dbRes = await await client.db("TODO").collection("tasks").find({user: req.params["name"]}).toArray();
    for (const idx in dbRes) {
        dbRes[idx]["isDone"] ? stats[0] += 1 : stats[1] += 1;
    }
    res.send(JSON.stringify({"Done": stats[0], "NotDone": stats[1]}))
})

app.listen(5000, () => console.log('Ready to server on port 5000'));
