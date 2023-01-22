const express = require("express")
var bodyParser = require('body-parser');
const stripe = require("stripe")('sk_test_51MGSPSBHamWcZVuTLI0Q8gZ6ceiEIPYMKMOFshnChtnv0PdDdglqgtBnbM0UkfF3eelK1YhhqSUI34gQSVHgvNsz00UYfcmzgU')

var cors = require("cors")

const app = express();

app.use(cors());

require("dotenv").config()

let dbpassword = process.env.DB

const bcrypt = require("bcryptjs")

const User = require("./userSchema.js")

const Brand = require("./brandSchema.js")

app.use(express.json());

app.use(express.urlencoded({ extended: false }))

app.use(bodyParser.json());

const { uploadFile, upload } = require('./helper/s3Multer.jsx')

const port = process.env.PORT || 4000


app.listen(port, () => {








    app.post('/payment', async (req, res) => {

        const total = req.body.amount
        console.log(total)


        const payment = await stripe.paymentIntents.create({
            amount: total * 100,
            currency: "pkr"
        })



        res.status(201).send({ clientSecret: payment.client_secret })


    })




    app.get('/getdata', (req, res) => {



        const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const uri = `mongodb+srv://mehdi:${dbpassword}@cluster0.xuahs.mongodb.net/?retryWrites=true&w=majority`;
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
        const uri = `mongodb+srv://mehdi:${dbpassword}@cluster0.xuahs.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });






        client.connect(err => {
            // const collection = client.db("database0").collection("bhaiyya");




            client.db("database0").collection("bhaiyya").updateOne({ cart: Array }, { $push: { "cart": { v: req.body.v, brandId: req.body.brandId } } })
                .then((ans) => console.log(ans))
                .catch((err) => console.log(err))

        });



        console.log(req.body)
        client.close()



    })

    app.use('/images', express.static('images'))

    app.post('/uploadFile', upload.single("file"), uploadFile)




    app.post("/register_brand", (req, res) => {



        const { MongoClient, ServerApiVersion } = require('mongodb');
        const uri = `mongodb+srv://mehdi:${dbpassword}@cluster0.xuahs.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




        const branddata = new Brand(req.body)

        client.connect(err => {


            client.db("database0").collection("bhaiyya").updateOne({ brands: Array }, { $push: { "brands": branddata } })
                .then((ans) => res.send({ message: "registered", type: "success" }))
                .catch((err) => res.send(err))



        });



    })





    app.post("/add-prod", (req, res) => {



        const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
        const uri = `mongodb+srv://mehdi:${dbpassword}@cluster0.xuahs.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




        console.log(req.body)
        client.connect(err => {
            // const collection = client.db("database0").collection("bhaiyya");


            client.db("database0").collection("bhaiyya").updateOne({ "brands._id": ObjectId(req.body.brand) }, { $push: { "brands.$.products": { name: req.body.name, img: req.body.img, price: req.body.price } } })


                .then((ans) => res.send({ type: "success", message: "product added" }))
                .catch((err) => console.log(err))



        });



    })



    app.post("/dlt-prod", (req, res) => {



        const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
        const uri = `mongodb+srv://mehdi:${dbpassword}@cluster0.xuahs.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





        client.connect(err => {
            // const collection = client.db("database0").collection("bhaiyya");




            // client.db("database0").collection("bhaiyya").deleteOne({ "brands._id": ObjectId(req.body.brand) }, { $push: { "brands.$.products": { name: req.body.name, img: req.body.img, price: req.body.price } } })

            client.db("database0").collection("bhaiyya").updateOne({ "brands._id": ObjectId(req.body.brand._id) }, { $pull: { "brands.$.products": req.body.e } })


                .then((ans) => res.send({ type: "success", message: "product added" }))
                .catch((err) => console.log(err))



        });



    })








    app.post("/brand-login", (req, res) => {
        const { MongoClient, ServerApiVersion } = require('mongodb');
        const uri = `mongodb+srv://mehdi:${dbpassword}@cluster0.xuahs.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





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
        const uri = `mongodb+srv://mehdi:${dbpassword}@cluster0.xuahs.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



        userdata = new User(req.body)


        client.connect(err => {



            client.db("database0").collection("bhaiyya").updateOne({ users: Array }, { $push: { "users": userdata } })



                .then((ans) => console.log(ans))



                .catch((err) => console.log(err))


        });



    })












})