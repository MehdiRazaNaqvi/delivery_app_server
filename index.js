const express = require("express")
var bodyParser = require('body-parser');


var cors = require("cors")

const app = express();

app.use(cors());





// app.use(express.json());

// app.use(express.urlencoded({ extended: false }))

// app.use(bodyParser.json());



const port = process.env.PORT || 4000


app.listen(port, () => {


    app.get('/getdata', (req, res) => {
        // console.log(req.body)








        const { MongoClient, ServerApiVersion } = require('mongodb');
        const uri = "mongodb+srv://mehdi:mehdimongodb@cluster0.xuahs.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





        client.connect(err => {
            // const collection = client.db("database0").collection("bhaiyya")





            client.db("database0").collection("bhaiyya").find({}).toArray()
                .then((ans) => res.send(ans))
                .catch((err) => console.log(err))



            // client.close()

        });





    })




    app.get('/', (req, res) => {


 

        res.send("HELLO WORLD")

    })




    app.get('/getmongo', (req, res) => {



        const { MongoClient, ServerApiVersion } = require('mongodb');
        const uri = "mongodb+srv://mehdi:mehdimongodb@cluster0.xuahs.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





        client.connect(err => {
            const collection = client.db("database0").collection("col0");





            collection.insertOOne({ name: "Kumail" }).toArray()
            // .then((ans) => res.send(ans))
            // .catch((err) => console.log(err))
        });












    })






})