import Router from 'next/router'
import React, {useState} from 'react'
import { authenticate, login } from '../../actions/auth'

const LoginComponent = ()=>{
    const [values, setValues] = useState({
        email: 'a1@a.com',
        password: '123456',
        error: '',
        loading: false,
        message: '',
        showForm: true
    })

    const { email, password, error, loading, message, showForm } = values

    const showLoading = () => {
        return loading ? <div className="alert alert-info">Loading</div> : ""
    }

    const showError = () => {
        return error ? <div className="alert alert-danger">{error}</div> : ""
    }

    const showMessage = () => {
        return message ? <div className="alert alert-info">{message}</div> : ""
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.table({ name, email, password, error, loading, message, showForm })
        setValues({...values, loading: true, error: false})
        const user = {email, password}
        login(user).then((data)=>{
            if(data.error) {
                console.log(data.error)
                setValues({...values, error: data.error, loading: false})
            } else {
                authenticate(data, ()=>{
                    Router.push("/")
                })
            }
        })
    }
    const handleChange = name => (e) => {
        setValues({...values, error: false, [name]: e.target.value})
    }
    const loginForm = () => { return (
        <form onSubmit={handleSubmit}>
            <div className="form-group pt-1 pb-1">
                <input value={email} onChange={handleChange('email')} type="email" className="form-control" placeholder="Type your email" />
            </div>
            <div className="form-group pt-1 pb-2">
                <input value={[password]} onChange={handleChange('password')} type="password" className="form-control" placeholder="Type your password" />
            </div>
            <div className="text-center">
                <button className="btn btn-primary">Login</button>
            </div>
        </form>
    )
    }
    return (
        <React.Fragment>
            {showError()}
            {showMessage()}
            {showLoading()}
            {showForm && loginForm()}
        </React.Fragment>
    )
}

export default LoginComponent
