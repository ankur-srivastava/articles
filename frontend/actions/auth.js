import fetch from 'isomorphic-fetch'

import { API } from '../config'

// To make API call

const signup = (user)=>{
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

export default signup
