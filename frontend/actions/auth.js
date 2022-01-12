import fetch from 'isomorphic-fetch'
import cookie from 'js-cookie'

import { API } from '../config'

// To make API call

export const signup = (user)=>{
    console.log(API)
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then((response)=>{
        return response.json()
    }).catch((error)=>{
        console.log(error)
    })
}

export const login = (user)=>{
    console.log(API)
    return fetch(`${API}/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then((response)=>{
        return response.json()
    }).catch((error)=>{
        console.log(error)
    })
}

// set cookie
export const setCookie = (key, value)=>{
    // check that next is running on the client side
    if(process.browser) {
        cookie.set(key, value, {
            expires: 1
        })
    }
}

export const removeCookie = (key)=>{
    if(process.browser) {
        cookie.remove(key)
    }
}

// get cookie
export const getCookie = (key)=>{
    if(process.browser) {
        cookie.get(key)
    }
}

// local storage
export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const removeLocalStorage = (key) => {
    localStorage.removeItem(key)
}

// authenticate
export const authenticate = (data, next) => {
    setCookie('token', data.token)
    setLocalStorage('user', data.user)
    next()
}

export const isAuth = () => {
    if(process.browser) {
        const cookieChecked = getCookie('token')
        if(cookieChecked) {
            if(localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false
            }
        }
    }
}
