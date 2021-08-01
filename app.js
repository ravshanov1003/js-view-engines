const morgan = require('morgan')
const express = require("express")
const mongoose = require("mongoose")

// express app
const app = express()

// connect to MongoDB
const dbURI = "mongodb://localhost:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&3t.uriVersion=3&3t.connection.name=localHost&3t.defaultColor=208,60,60&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log("connected to DB"))
    .catch(err => console.log(err))

// register view engine
app.set('view engine', 'ejs');

app.listen(3000, () => console.log("Server is running"))

app.use(morgan('dev'))

// middleware & static files
app.use(express.static('public'));

app.get("/", (req, res) => {
    const blogs = [
        { title: 'First blog', snippet: 'Lorem ipsum dolor sit amet consectetur.' },
        { title: 'Second blog', snippet: 'Lorem ipsum dolor sit.' },
        { title: 'Third blog', snippet: 'Lorem ipsum dolor sit amet consectetur.' }
    ]
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
})

app.get('/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' })
})

app.get('/about-me', (req, res) => {
    res.redirect('/about')
})

app.use((req, res) => {
    res.status(404).render('404', { title: 404 })
})