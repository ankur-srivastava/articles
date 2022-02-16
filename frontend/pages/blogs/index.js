import Layout from '../../components/Layout'
import { listBlogsWithCategoriesAndTags } from '../../actions/blog'
import BlogCard from '../../components/blog/BlogCard'
import Link from 'next/link'
import Head from 'next/head'
import { withRouter } from 'next/router'
import { DOMAIN, APP_NAME, FACEBOOK_APP_ID } from '../../config'
import React from 'react'

const Blogs = ({blogs, categories, tags, size, router}) => {
    const head = () => (
        <Head>
            <title>Programming Blog | {APP_NAME}</title>
            <meta name='description' content='Programming Tutorials on Android, Javascript, Python'/>
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property='og:title' content={`Latest web development tutorials | ${APP_NAME}`}/>
            <meta property='og:description' content='Programming Tutorials on Android, Javascript, Python'/>
            <meta property='og:type' content='website' />
            <meta property='og:url' content={`${DOMAIN}${router.pathname}`} />
            <meta property='og:site_name' content={`${APP_NAME}`} />
            <meta property='og:image' content={`${DOMAIN}/static/sample.jpeg`} />
            <meta property='og:image:secure_url' content={`${DOMAIN}/static/sample.jpeg`} />
            <meta property='og:image:type' content="image/jpeg" />
            <meta property='fb:app_id' content={`${FACEBOOK_APP_ID}`} />
        </Head>
    )
    const showAllBlogs = () => {
        return blogs.map((blog, index) => {
            return <article key={index}>
                <BlogCard blog={ blog }/>
                <hr />
            </article>
        })
    }
    const showAllCategories = () => {
        return categories.map((c, i)=>(
            <Link href={`/categories/${c.slug}`} key={i}>
                <a className='btn btn-primary' style={{marginRight: 1, marginLeft: 1, marginTop: 3}}>{c.name}</a>
            </Link>
        ))
    }
    const showAllTags = () => {
        return tags.map((t, i)=>(
            <Link href={`/tags/${t.slug}`} key={i}>
                <a className='btn btn-outline-primary' style={{marginRight: 1, marginLeft: 1, marginTop: 3}}>{t.name}</a>
            </Link>
        ))
    }

    return (
            <React.Fragment>
                {head()}
                <Layout>
                    <main>
                        <div className="container-fluid">
                            <header>
                                <div className="col-md-12 pt-3">
                                    <h1 className="display-4 font-weight-bold text-center">
                                        Programming Blog
                                    </h1>
                                    <section>
                                        <div className="pb-5 text-center">
                                            {showAllCategories()}
                                            <br />
                                            {showAllTags()}
                                        </div>
                                    </section>
                                </div>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12">
                                            {showAllBlogs()}
                                        </div>
                                    </div>
                                </div>
                            </header>
                        </div>
                    </main>
                </Layout>
            </React.Fragment>
    )
}

Blogs.getInitialProps = () => {
    return listBlogsWithCategoriesAndTags().then(data=>{
        if(data.error) {
            console.log(data.error)
        } else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                size: data.size
            }
        }
    })
}

export default withRouter(Blogs)
