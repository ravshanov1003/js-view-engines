const morgan = require('morgan')
const express = require("express")
const mongoose = require("mongoose")

const blogRoutes = require('./routes/blogRoutes')

// express app
const app = express()

// connect to MongoDB
const dbURI = "mongodb://localhost:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&3t.uriVersion=3&3t.connection.name=localHost&3t.defaultColor=208,60,60&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000, () => console.log("Server is running")))
    .catch(err => console.log(err))

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get("/", (req, res) => {
    res.redirect("/blogs")
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
})

// blog route
app.use(blogRoutes)

app.get('/about-me', (req, res) => {
    res.redirect('/about')
})
app.use((req, res) => {
    res.status(404).render('404', { title: 404 })
})