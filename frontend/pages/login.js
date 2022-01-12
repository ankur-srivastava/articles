import LoginComponent from "../components/auth/LoginComponent"
import Layout from "../components/Layout"

function Login() {
    return <Layout>
        <h2 className="text-center pt-4 pb-4">Login</h2>
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <LoginComponent />
            </div>
        </div>
    </Layout>
}

export default Login
