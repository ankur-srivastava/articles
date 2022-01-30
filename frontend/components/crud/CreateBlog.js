import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), {ssr: false})
import { withRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getCookie } from '../../actions/auth'
import { create } from '../../actions/blog'
import { getCategories } from '../../actions/category'
import { getTags } from '../../actions/tag'
import '../../node_modules/react-quill/dist/quill.snow.css'
import { QuillModules, QuillFormats } from '../../helpers/quill'

const CreateBlog = ({ router }) => {
    const localStorageBlog = () => {
        if(typeof window === 'undefined') {
            return false
        }

        if(localStorage.getItem('blog')) {
            return JSON.parse(localStorage.getItem('blog'))
        }
    }

    const [body, setBody] = useState(localStorageBlog())
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        hidePublishButton: false
    })
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [checkedCategories, setCheckedCategories] = useState([])
    const [checkedTags, setCheckedTags] = useState([])

    const {error, sizeError, success, formData, title, hidePublishButton} = values
    const token = getCookie('token')

    const initCategories = () => {
        getCategories().then(data=>{
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setCategories(data)
            }
        })
    }

    const initTags = () => {
        getTags().then(data=>{
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setTags(data)
            }
        })
    }

    useEffect(() => {
        setValues({...values, formData: new FormData()})
        initCategories()
        initTags()
    }, [router])

    const publishBlog = (e) => {
        e.preventDefault()
        // For debug
        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }
        create(formData, token).then(data=>{
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, title: '', error: '', success: `Your blog - ${data.title}, has been published`})
                setBody('')
                setCategories([])
                setTags([])
            }
        })
    }

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        formData.set(name, value)
        setValues({...values, [name]: value, formData, error: ''})
    }

    const handleBody = e => {
        setBody(e)
        formData.set('body', e)

        if (typeof window !== 'undefined') {
            localStorage.setItem('blog', JSON.stringify(e))
        }
    }

    const handleCategoriesToggle = (id) => () => {
        setValues({...values, error: ''})
        // use indexof to check if id is already present. If present remove it, else add it
        // returns first index else -1
        // to update the array we need to use the setCategories method
        const clicked = checkedCategories.indexOf(id)
        const all = [...checkedCategories]

        if (clicked === -1) {
            all.push(id)
        } else {
            all.splice(id, 1)
        }
        setCheckedCategories(all)
        formData.set('categories', all)
    }

    const handleTagsToggle = (id) => () => {
        setValues({...values, error: ''})
        const clicked = checkedTags.indexOf(id)
        const all = [...checkedTags]

        if (clicked === -1) {
            all.push(id)
        } else {
            all.splice(id, 1)
        }
        setCheckedTags(all)
        formData.set('tags', all)
    }

    const showCategories = () => {
        return (
            categories && categories.map((c, i)=> (
                <li key={i} className="list-unstyled">
                    <input type="checkbox" onChange={handleCategoriesToggle(c._id)} className="mr-2" />
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        )
    }

    // Note in the map function we use () instead of {}, so that we dont need to return
    const showTags = () => {
        return (
            tags && tags.map((t, i)=> (
                <li key={i} className="list-unstyled">
                    <input type="checkbox" onChange={handleTagsToggle(t._id)} className="mr-2" />
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        )
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>{error}</div>
    )

    const showSuccess = () => (
        <div className="alert alert-success" style={{display: success ? '' : 'none'}}>{success}</div>
    )

    const createBlogForm = () => {
        return (
            <form onSubmit={publishBlog}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
                </div>
                <div className="form-group">
                    <ReactQuill modules={QuillModules} formats={QuillFormats} value={ body } placeholder='Write something amazing' onChange={ handleBody }/>
                </div>
                <div>
                    <button className="btn-primary" type='submit'>Publish</button>
                </div>
            </form>
        )
    }

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-8">
                    <div className='pb-2'>
                        {showError()}
                        {showSuccess()}
                    </div>
                    {createBlogForm()}
                </div>
                <div className="col-md-4">
                    <div>
                        <div className="form-group pb-2">
                            <h5>Featured Image</h5>
                            <hr />

                            <small className="text-muted">Maximum Size: 1MB</small>
                            <br />
                            <label className="btn btn-outline-info">
                                Featured Image
                                <input onChange={handleChange('photo')} type='file' accept='image/*' hidden/>
                            </label>
                        </div>
                    </div>
                    <div>
                        <h5>Categories</h5>
                        <hr />
                        <ul style={{maxHeight: '200px', overflowY: 'scroll'}}>{showCategories()}</ul>
                    </div>
                    <div>
                        <h5>Tags</h5>
                        <hr />
                        <ul style={{maxHeight: '200px', overflowY: 'scroll'}}>{showTags()}</ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(CreateBlog)
