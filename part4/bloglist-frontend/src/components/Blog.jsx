import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, handleDelete, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user
    }

    try {
      const response = await blogService.update(blog.id, updatedBlog)
      const updatedBlogWithUser = { ...response, user: blog.user }
      updateBlog(updatedBlogWithUser)
    } catch (error) {
      console.error('Failed to update likes:', error)
    }
  }

  const confirmAndDelete = () => {
    if (window.confirm(`Delete blog ${blog.title}`)) {
      handleDelete(blog)
    }
  }


  return (
    <div style={blogStyle}>
      <div>
        <strong>{blog.title}</strong>
        <Togglable buttonLabel="view">
          <p>URL: {blog.url}</p>
          <p>Likes: {blog.likes} <button onClick={handleLike}>like</button></p>
          <p>Added by: {blog.user?.name || 'Anonymous'}</p>
          <div>
            {user && blog.user.username === user.username && (
              <button onClick={confirmAndDelete} style={{ color: 'red' }}>delete</button>
            )}
          </div>
        </Togglable>
      </div>
    </div>
  )
}

export default Blog
