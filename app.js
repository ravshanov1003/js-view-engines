const express = require("express")

const app = express()

// register view engine
app.set('view engine', 'ejs');


app.listen(3000, () => console.log("Server is running"))

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