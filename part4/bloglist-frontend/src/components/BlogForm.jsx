import { useState } from "react";
import blogService from '../services/blogs';

const BlogForm = ({ setBlogs, blogs, showNotification, toggleVisibility }) => {
    const [newBlog, setNewBlog] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleBlogChange = (event) => setNewBlog(event.target.value)
    const handleUrlChange = (event) => setNewUrl(event.target.value)

    const addBlog = async (event) => {
        event.preventDefault()
        toggleVisibility()
        const blogObject = {
            title: newBlog,
            url: newUrl,
            likes: 0
        }

        try {
            const returnedBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(returnedBlog))
            setNewBlog('')
            setNewUrl('')
            showNotification(`Blog "${blogObject.title}" added successfully`)
        } catch (exception) {
            showNotification('Failed to add blog', 'error')
        }
    }

    return (
        <>
            <h3>Create new blog</h3>
            <form onSubmit={addBlog}>
                <p>Title</p>
                <input
                    value={newBlog}
                    onChange={handleBlogChange}
                />
                <br />
                <p>url</p>
                <input
                    value={newUrl}
                    onChange={handleUrlChange}
                />
                <br />
                <button type='submit'>save</button>
            </form>
        </>
    )
}

export default BlogForm