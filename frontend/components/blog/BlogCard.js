import Link from 'next/link'
import moment from 'moment'
import renderHTML from 'react-render-html'
import { API } from '../../config'
import { useState } from 'react'

const BlogCard = ({blog}) => {
    const [imgSrc, setImgSrc] = useState(`${API}/blog/photo/${blog.slug}`)
    const onError = () => setImgSrc('/static/sample.jpeg')

    const showBlogCategories = blog => (
        blog.categories.map((c, i) => (
            <Link key={i} href={`${API}/categories/${c.slug}`}>
                <a style={{textDecoration: 'none', margin: 1}} className='btn btn-primary'>{c.name}</a>
            </Link>
        ))
    )

    const showBlogTags = blog => (
        blog.tags.map((t, i) => (
            <Link key={i} href={`${API}/tags/${t.slug}`}>
                <a style={{textDecoration: 'none', margin: 1}} className='btn btn-outline-primary'>{t.name}</a>
            </Link>
        ))
    )

    return (
        <div className="lead pb-4">
                    <header>
                        <Link href={`blogs/${blog.slug}`}>
                            <a style={{textDecoration: 'none'}}><h2 className="pt-3 pb-3 font-weight-bold">{blog.title}</h2></a>
                        </Link>
                    </header>
                    <section>
                        <p className="mark ml-1 pt-2 pb-2">
                            Written by {blog.postedBy.name} | Last updated {moment(blog.updatedAt).fromNow()}
                        </p>
                    </section>
                    <section>
                        {showBlogCategories(blog)}
                        {showBlogTags(blog)}
                        <br /><br />
                    </section>
                    <div className="row">
                        <div className="col-md-4">
                            <section>
                                <img src= {imgSrc ? imgSrc : '/static/sample.jpeg'}
                                    onError={onError}
                                    alt={blog.title}
                                    className="img img-fluid" style={{maxHeight: '150px', width: 'auto'}} />
                            </section>
                        </div>
                        <div className="col-md-8">
                            <section>
                                <div className="pb-3">{ blog.excerpt !== undefined ? renderHTML(blog.excerpt) : '' }</div>
                                <Link href={`blogs/${blog.slug}`}>
                                    <a className='btn btn-primary pt-2'>Read More</a>
                                </Link>
                            </section>
                        </div>
                    </div>
                </div>
    )
}

export default BlogCard
