import Link from "next/link"
import Layout from "../components/Layout"

function Index() {
    return <Layout>
        <h2>Main Content</h2>
        <Link href="/signup">
            <a>Signup</a>
        </Link>
    </Layout>
}

export default Index
