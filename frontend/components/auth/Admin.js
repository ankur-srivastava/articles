import Router from "next/router"
import React, { useEffect } from "react"
import { isAuth } from "../../actions/auth"

const Admin = ({children}) => {
    useEffect(()=>{
        if(!isAuth()) {
            Router.push('/login')
        } else if(isAuth() && isAuth().role !== 1) {
            Router.push('/')
        }
    }, [])

    return <React.Fragment>
        {children}
    </React.Fragment>
}

export default Admin
