const morgan = require('morgan')
const express = require("express")
const mongoose = require("mongoose")

const Blog = require("./models/blog")

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

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: "new blog ten",
        snippet: 'about my new blog ',
        body: 'more about my new blog in here'
    })
    blog.save()
        .then((result) => res.send(result))
        .catch(err => console.log(err))
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then(result => res.send(result))
        .catch(err => console.log(err))
})

app.get('/single-blog', (req, res) => {
    Blog.findById("61064bbeee0afc23fc223dda")
        .then(result => res.send(result))
        .catch(err => console.log(err))

})

app.get("/", (req, res) => {
    res.redirect("/blogs")
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
})

// blog route
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: "all blogs", blogs: result })
        })
        .catch(err => console.log(err))
})

app.post("/blogs", (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then((result) => {
            res.redirect('/blogs', )
        })
        .catch(err => console.log(err))
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: "Blgo details" })
        })
        .catch(err => console.log(err))
})

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' })
        })
        .catch(err => console.log(err))
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