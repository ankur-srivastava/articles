import React, { useState, useEffect } from "react"
import { getCookie } from "../../actions/auth"
import { create, getCategories, removeCategory } from "../../actions/category"

const Category = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        categories: [],
        removed: false,
        reload: false
    })
    const { name, error, success, categories, removed, reload } = values
    const token = getCookie('token')

    useEffect(()=>{
        loadCategories()
    }, [reload])

    const loadCategories = ()=>{
        getCategories().then(data=>{
            if(data.error) {
                console.error(data.error)
            } else {
                setValues({...values, categories: data})
            }
        })
    }

    const showCategories = () => {
        return categories.map((c, i) => {
            return <button
                    title="Double click to delete"
                    onDoubleClick={()=>{ deleteConfirm(c.slug) }} key={i} className="btn btn-outline-primary mr-1 ml-1 mt-3">
                {c.name}
            </button>
        })
    }

    const showSuccess = () => {
        if(success) {
            return <p className="text-success">Category is created</p>
        }
    }

    const showError = () => {
        if(error) {
            return <p className="text-danger">Category already exists</p>
        }
    }

    const showRemoved = () => {
        if(removed) {
            return <p className="text-danger">Category is removed</p>
        }
    }

    const deleteConfirm = (slug) => {
        let answer = window.confirm('Are you sure you want to delete this category ', slug)
        if(answer) {
            deleteCategory(slug)
        }
    }

    const deleteCategory = (slug) => {
        removeCategory(slug, token).then(data=>{
            if(data.error) {
                console.error(data.error)
            } else {
                setValues({...values, error: false, success: false, name: '', removed: true, reload: !reload})
            }

        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        create({name}, token).then(data=>{
            if(data.error) {
                setValues({...values, error: data.error, success: false})
            } else {
                setValues({...values, error: false, success: true, name: '', removed: false, reload: !reload})
            }
        }).catch((e)=>{
            console.error(e)
        })
    }

    const mouseMoveHandler = (e) => {
        setValues({...values, error: false, success: false, removed: false})
    }

    const handleChange = (e) => {
        setValues({...values, name: e.target.value, error: false, success: false, removed: '', reload: false})
    }

    const newCategoryForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group pb-2">
                    <label className="text-muted">Name</label>
                    <input type="text" className="form-control" onChange={handleChange} value={name} required/>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
        )
    }

    return <React.Fragment>
        {showSuccess()}
        {showError()}
        {showRemoved()}
        <div onMouseMove={mouseMoveHandler}>
            {newCategoryForm()}
            {showCategories()}
        </div>
        </React.Fragment>
}

export default Category
