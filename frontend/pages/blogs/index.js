import Layout from '../../components/Layout'
import { listBlogsWithCategoriesAndTags } from '../../actions/blog'
import BlogCard from '../../components/blog/BlogCard'
import Link from 'next/link'

const Blogs = ({blogs, categories, tags, size}) => {
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

export default Blogs
