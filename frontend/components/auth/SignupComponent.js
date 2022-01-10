import React, {useState} from 'react'
import signup from '../../actions/auth'

const SignupComponent = ()=>{
    const [values, setValues] = useState({
        name: 'aard',
        email: 'a1@a.com',
        password: '123456',
        error: '',
        loading: false,
        message: '',
        showForm: true
    })

    const { name, email, password, error, loading, message, showForm } = values

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
        const user = {name, email, password}
        signup(user).then((data)=>{
            console.log(data.message)
            if(data.error) {
                console.log(data.error)
                setValues({...values, error: data.error, loading: false})
            } else {
                setValues({...values, name: '', 
                email: '', password: '', error: '', loading: false, message: data.message, 
                showForm: false})
            }
        })
    }
    const handleChange = name => (e) => {
        setValues({...values, error: false, [name]: e.target.value})
    }
    const signupForm = () => { return (
        <form onSubmit={handleSubmit}>
            <div className="form-group pb-1">
                <input value={name} onChange={handleChange('name')} type="text" className="form-control" placeholder="Type your name" />
            </div>
            <div className="form-group pt-1 pb-1">
                <input value={email} onChange={handleChange('email')} type="email" className="form-control" placeholder="Type your email" />
            </div>
            <div className="form-group pt-1 pb-2">
                <input value={[password]} onChange={handleChange('password')} type="password" className="form-control" placeholder="Type your password" />
            </div>
            <div class="text-center">
                <button className="btn btn-primary">Signup</button>
            </div>
        </form>
    )
    }
    return (
        <React.Fragment>
            {showError()}
            {showMessage()}
            {showLoading()}
            {showForm && signupForm()}
        </React.Fragment>
    )
}

export default SignupComponent
