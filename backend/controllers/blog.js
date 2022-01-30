const Blog = require('../models/blog')
const formidable = require('formidable')
const slugify = require('slugify')
const stripHtml = require('string-strip-html')
const _ = require('lodash')
const fs = require('fs')
const Category = require('../models/category')
const Tag = require('../models/tag')
const { errorHandler } = require('../helpers/dbErrorHandler')
const { smartTrim } = require('../helpers/blog')

exports.create = (req, res)=>{
    // since we are handling form data
    console.log('Publish Blog request received')
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files)=>{
        if(err) {
            return res.status(400).json({
                error: err
            })
        }

        const { title, body, categories, tags } = fields

        // validation
        if(!title || !title.length) {
            return res.status(400).json({
                error: 'Title is required'
            })
        }

        if(!body || body.length < 200) {
            return res.status(400).json({
                error: 'Body should have at least 200 characters'
            })
        }

        if(!categories || categories.length === 0) {
            return res.status(400).json({
                error: 'At least one category is required'
            })
        }

        if(!tags || tags.length === 0) {
            return res.status(400).json({
                error: 'At least one tag is required'
            })
        }

        const blog = new Blog({
            title,
            body,
            excerpt: smartTrim(body, 320, ' ', '...'),
            slug: slugify(title).toLowerCase(),
            mtitle: `${title} | ${process.env.APP_NAME}`,
            mdesc: stripHtml(body.substring(0, 160)),
            postedBy: req.auth._id
        })

        // Check if photo is > 1MB
        if(files.photo) {
            if(files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Please upload a photo with size less than 1MB'
                })
            } else {
                console.log('Photo 1')
                blog.photo.data = fs.readFileSync(files.photo.filepath)
                blog.photo.contentType = files.photo.mimetype
                console.log('Photo 2')
            }
        }

        // array of categories and tags
        let categoriesArray = categories && categories.split(',')
        let tagsArray = tags && tags.split(',')

        blog.save((err, response) => {
            if(err) {
                console.error(`Got error while saving blog ${err}`)
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            Blog.findByIdAndUpdate(response._id, {$push: {categories: categoriesArray}}, {new: true}).exec(
                (err, result) => {
                    if(err) {
                        console.error(err)
                        res.status(400).json({error: errorHandler(err)})
                    } else {
                        Blog.findByIdAndUpdate(result._id, {$push: {tags: tagsArray}}, {new: true}).exec(
                            (err, result) => {
                                if(err) {
                                    console.error(err)
                                    res.status(400).json({error: errorHandler(err)})
                                } else {
                                    res.json(result)
                                }    
                            }
                        )
                    }
                }
            )
        })
    })
}
