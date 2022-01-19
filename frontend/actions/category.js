import fetch from 'isomorphic-fetch'

import { API } from '../config'

// To make API call

export const create = (category, token)=>{
    return fetch(`${API}/category`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    }).then((response)=>{
        return response.json()
    }).catch((error)=>{
        console.log(error)
    })
}

export const getCategories = ()=>{
    return fetch(`${API}/categories`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response)=>{
        return response.json()
    }).catch((error)=>{
        console.log(error)
    })
}

export const getCategory = (slug)=>{
    return fetch(`${API}/category/${slug}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response)=>{
        return response.json()
    }).catch((error)=>{
        console.log(error)
    })
}

export const removeCategory = (slug, token)=>{
    return fetch(`${API}/category/${slug}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then((response)=>{
        return response.json()
    }).catch((error)=>{
        console.log(error)
    })
}
