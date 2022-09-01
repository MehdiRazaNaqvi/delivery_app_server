const express = require("express")
var bodyParser = require('body-parser');


var cors = require("cors")

const app = express();

app.use(cors());





app.use(express.json());

app.use(express.urlencoded({ extended: false }))

app.use(bodyParser.json());



const port = process.env.PORT || 4000


app.listen(port, () => {






    app.get('/getdata', (req, res) => {



        const { MongoClient, ServerApiVersion } = require('mongodb');
        const uri = "mongodb+srv://mehdi:mehdimongodb@cluster0.xuahs.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





        client.connect(err => {
            // const collection = client.db("database0").collection("bhaiyya")





            client.db("database0").collection("bhaiyya").find({}).toArray()
                .then((ans) => res.send(ans))
                .catch((err) => console.log(err))




        });


        client.close()



    })




    app.get('/', (req, res) => {




        res.send("HELLO WORLD")

    })




    app.get('/getmongo', (req, res) => {




        const { MongoClient, ServerApiVersion } = require('mongodb');
        const uri = "mongodb+srv://mehdi:mehdimongodb@cluster0.xuahs.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });






        client.connect(err => {
            const collection = client.db("database0").collection("voting");





            collection.find({}).toArray()
                .then((ans) => res.send(ans))
                .catch((err) => console.log(err))
        });








    })





    app.post("/add_to_cart", (req, res) => {



        const { MongoClient, ServerApiVersion } = require('mongodb');
        const uri = "mongodb+srv://mehdi:mehdimongodb@cluster0.xuahs.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });






        client.connect(err => {
            // const collection = client.db("database0").collection("bhaiyya");




            client.db("database0").collection("bhaiyya").updateOne({ cart: Array }, { $push: { "cart": req.body } })
                .then((ans) => console.log(ans))
                .catch((err) => console.log(err))

        });



        console.log(req.body)
        client.close()



    })





    app.post("/register_brand", (req, res) => {



        const { MongoClient, ServerApiVersion } = require('mongodb');
        const uri = "mongodb+srv://mehdi:mehdimongodb@cluster0.xuahs.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



        console.log(req.body)


        client.connect(err => {
            // const collection = client.db("database0").collection("bhaiyya");




            client.db("database0").collection("bhaiyya").updateOne({ brands: Array }, { $push: { "brands": req.body } })
                .then((ans) => console.log(ans))
                .catch((err) => console.log(err))

        });



    })





    app.post("/add-prod", (req, res) => {



        const { MongoClient, ServerApiVersion } = require('mongodb');
        const uri = "mongodb+srv://mehdi:mehdimongodb@cluster0.xuahs.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



        console.log(req.body)


        client.connect(err => {
            // const collection = client.db("database0").collection("bhaiyya");




            client.db("database0").collection("bhaiyya").updateOne({ "brands.brand": req.body.brand }, { $push: { "brands.$.products": { name: req.body.name, img: req.body.img, price: req.body.price } } })


                .then((ans) => console.log(ans))
                .catch((err) => console.log(err))


        });



    })








    app.post("/brand-login", (req, res) => {
        const { MongoClient, ServerApiVersion } = require('mongodb');
        const uri = "mongodb+srv://mehdi:mehdimongodb@cluster0.xuahs.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



        console.log(req.body)


        // client.connect(err => {



        //     client.db("database0").collection("bhaiyya").find({}).toArray()


        //         .then((ans) =>

        //             // console.log(ans[0].brands)
        //             ans[0].brands.map(v => v.brand == "J" && v.password == "junaid" ? console.log(v) : null)


        //         )


        //         .catch((err) => console.log(err))


        // });



    })





    app.post("/adduser", (req, res) => {

        const { MongoClient, ServerApiVersion } = require('mongodb');
        const uri = "mongodb+srv://mehdi:mehdimongodb@cluster0.xuahs.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





        client.connect(err => {



            client.db("database0").collection("bhaiyya").updateOne({ users: Array }, { $push: { "users": req.body } })



                .then((ans) => console.log(ans))


                .catch((err) => console.log(err))


        });



    })


    




})