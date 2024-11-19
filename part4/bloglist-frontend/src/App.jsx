import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const Notification = ({ message, type }) => {
    if (!message) return null

    const notificationStyle = {
      padding: '10px',
      border: '1px solid',
      borderRadius: '5px',
      marginBottom: '10px',
      backgroundColor: type === 'error' ? '#f8d7da' : '#d4edda',
      color: type === 'error' ? '#721c24' : '#155724'
    }

    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>

      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const updateBlog = (updateBlog) => {
    setBlogs(blogs.map(blog => (blog.id === updateBlog.id ? updateBlog : blog)))
  }

  const handleDelete = async (blog) => {
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      showNotification(`Blog "${blog.title}" deleted successfully`)
    } catch (exception) {
      showNotification('Failed to delete')
    }
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>Blogs</h2>

      {notification && <Notification message={notification.message} type={notification.type} />}

      {user === null ? (loginForm()) : <>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlog} handleDelete={handleDelete} />
        )
        }
        <Togglable buttonLabel='new blog' ref={blogFormRef}>

          <BlogForm setBlogs={setBlogs} blogs={blogs} showNotification={showNotification} toggleVisibility={() => blogFormRef.current.toggleVisibility()} />
        </Togglable>
      </>}


    </div>
  )
}

export default App