import fetch from 'isomorphic-fetch'

import { API } from '../config'

// To make API call

export const create = (blog, token)=>{
    return fetch(`${API}/blog`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: blog
    }).then((response)=>{
        return response.json()
    }).catch((error)=>{
        console.log(error)
    })
}

export const listBlogsWithCategoriesAndTags = ()=>{
    return fetch(`${API}/blogs-categories-tags`, {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        }
    }).then((response)=>{
        return response.json()
    }).catch((error)=>{
        console.log(error)
    })
}
