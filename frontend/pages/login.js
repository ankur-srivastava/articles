import Link from "next/link"
import Layout from "../components/Layout"

function Login() {
    return <Layout>
        <h2>Login</h2>
        <Link href="/">
            <a>Home</a>
        </Link>
    </Layout>
}

export default Login
