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
                blog.photo.data = fs.readFileSync(files.photo.filepath)
                blog.photo.contentType = files.photo.mimetype
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

// list, read, create, listBlogsCategoriesTags, remove, update

// To get categories corresponding to categoryId in a blog, and similarly tag we can use populate
exports.list = (req, res) => {
    Blog.find({})
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username')
        .select('_id title slug excerpt categories tags postedBy createdBy createdAt updatedAt')
        .exec((error, data) => {
            if(error) {
                return res.json({error: errorHandler(error)})
            }
            res.json(data)
        })
}

exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase()
    Blog.findOne({slug})
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username')
        .select('_id title body slug mtitle mdesc excerpt categories tags postedBy createdBy createdAt updatedAt')
        .exec((err, data) => {
            if(err) {
                return res.json({error: errorHandler(err)})
            }
            res.json(data)
        })
}

exports.listBlogsCategoriesTags = (req, res) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 10
    let skip = req.body.skip ? parseInt(req.body.skip) : 0

    let blogs
    let categories
    let tags

    Blog.find({})
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username')
        .select('_id title slug excerpt categories tags postedBy createdBy createdAt updatedAt')
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit)
        .exec((error, data) => {
            if(error) {
                return res.json({error: errorHandler(error)})
            }
            blogs = data
            // categories
            Category.find({}).exec((err, c) => {
                if(err) {
                    return res.json({
                        error: errorHandler(err)
                    })
                }
                categories = c
                // Get tags
                Tag.find({}).exec((err, t)=>{
                    if(err) {
                        return res.json({
                            error: errorHandler(err)
                        })
                    }
                    tags = t
                    res.json({blogs, categories, tags, size: blogs.length})
                })
            })
        })
}

exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase()
    Blog.findOneAndRemove({slug}).exec((err, data)=>{
        if(err) {
            return res.json({error: errorHandler(err)})
        }
        res.json({
            message: 'Blog deleted successfully'
        })
    })
}

exports.update = (req, res)=>{
    console.log('Update request received')
    const slug = req.params.slug.toLowerCase()
    Blog.findOne({slug}).exec((err, oldBlog) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        let form = new formidable.IncomingForm()
        form.keepExtensions = true
        form.parse(req, (err, fields, files)=>{
            if(err) {
                return res.status(400).json({
                    error: err
                })
            }
    
            // we will use lodash to merge the new changes
            // we will keep the old slug
            const slugBeforeMerge = oldBlog.slug
            oldBlog = _.merge(oldBlog, fields)
            oldBlog.slug = slugBeforeMerge

            const { body, categories, tags } = fields

            if(body) {
                oldBlog.excerpt = smartTrim(body, 320, ' ', ' ...')
                oldBlog.mdesc = stripHtml(body.substring(0, 160))
            }
    
            if(categories) {
                oldBlog.categories = categories.split(',')
            }

            if(tags) {
                oldBlog.tags = tags.split(',')
            }
    
            // Check if photo is > 1MB
            if(files.photo) {
                if(files.photo.size > 1000000) {
                    return res.status(400).json({
                        error: 'Please upload a photo with size less than 1MB'
                    })
                } else {
                    oldBlog.photo.data = fs.readFileSync(files.photo.filepath)
                    oldBlog.photo.contentType = files.photo.mimetype
                }
            }
    
            oldBlog.save((err, response) => {
                if(err) {
                    console.error(`Got error while saving blog ${err}`)
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }
                res.json(response)
            })
        })
    })
}
