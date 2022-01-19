import Link from "next/link"
import Admin from "../../components/auth/Admin"
import Layout from "../../components/Layout"

function AdminIndex() {
    return <Layout>
        <Admin>
            <div className="row">
                <div className="col-md-12 pt-5 pb-5">
                    <h2>Admin Dashboard</h2>
                </div>
                <div className="col-md-4">
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link href="/admin/crud/category-tag">
                            <a className="text-center m-2 p-2">Create Category</a>
                        </Link>
                        <Link href="/admin/crud/category-tag">
                            <a className="text-center m-2 p-2">Create Tag</a>
                        </Link>
                    </li>
                </ul>
                </div>
                <div className="col-md-12">
                    
                </div>
            </div>
        </Admin>
    </Layout>
}

export default AdminIndex
