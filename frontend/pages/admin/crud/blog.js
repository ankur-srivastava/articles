import Admin from "../../../components/auth/Admin"
import CreateBlog from "../../../components/crud/CreateBlog"
import Layout from "../../../components/Layout"

function Blog() {
    return <Layout>
        <Admin>
            <div className="row m-2 p-2">
                <div className="col-md-12 pt-2 pb-2">
                    <h2>Create a new Blog</h2>
                </div>
                <div className="col-md-12">
                    <CreateBlog />
                </div>
            </div>
        </Admin>
    </Layout>
}

export default Blog
