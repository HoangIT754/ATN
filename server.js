const express = require('express');
const bodyParser= require('body-parser')
const app = express();

const MongoClient = require('mongodb').MongoClient

const connectionString = 'mongodb+srv://hoangtngcs210793:123456abc@cluster0.4jznalp.mongodb.net/'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        
        const db = client.db('ATN')
        const quotesCollection = db.collection('quotes')
        
        app.set('view engine', 'ejs')
        
        app.use(bodyParser.urlencoded({ extended: true }))

        app.use(express.static('public'))

        app.use(bodyParser.json())
        //read task
        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
                .then(results => {

                    console.log(results)

                    res.render('index.ejs', { quotes: results })
                })
                .catch(/* ... */)
        })
        // create task
        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
            .then(result => {
                
                console.log(result)

                res.redirect('/')
             })
            .catch(error => console.error(error))
        })
        
        
        app.listen(3000, function() {
            console.log('listening on 3000')
        })
    })