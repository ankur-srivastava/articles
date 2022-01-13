import Router from "next/router"
import React, { useEffect } from "react"
import { isAuth } from "../../actions/auth"

const Private = ({children}) => {
    useEffect(()=>{
        if(!isAuth()) {
            Router.push('/login')
        } else {
            Router.push('/user')
        }
    }, [])

    return <React.Fragment>
        {children}
    </React.Fragment>
}

export default Private
