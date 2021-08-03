const express = require('express')
const blogController = require('../controllers/blogControllers')

const router = express.Router()

router.get('/blogs', blogController.blog_index)

router.post("/blogs", blogController.blog_create_post)

router.get('/create', blogController.blog_create_get)

router.get('/blogs/:id', blogController.blog_details)

router.delete('/blogs/:id', blogController.blog_delete)

module.exports = router;