import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Toggable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])
  const notify = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      notify(`User ${user.username} logged in`)
    } catch (exception) {
      notify(`${exception}`, 'error')
    }
  }

  const addBlog = (blogObject) => {

    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        notify(
          `'${`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`}'`
        )
        setBlogs(blogs.concat(returnedBlog))
      })
      .catch((exception) => {
        notify(`${exception}`, 'error')
      })
  }

  const updateBlog = async (id, blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(id, blogToUpdate)
      const newBlogs = blogs.map((blog) =>
        blog.id === id ? updatedBlog : blog
      )
      setBlogs(newBlogs)
    } catch (exception) {
      notify(exception, 'error')
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      await blogService.deleteService(blogId)

      const updatedBlogs = blogs.filter((blog) => blog.id !== blogId)
      setBlogs(updatedBlogs)

    } catch (exception) {
      notify(exception, 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const blogFormRef = useRef()
  return (
    <div>
      <Notification notification={notification} />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <h2>Create new blog</h2>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          <h2>blogs</h2>

          {blogs.sort((a, b) => b.likes - a.likes).map((blog) => (
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} username={user.username} deleteBlog={deleteBlog} />
          ))}

          <button id="logout-button" type="button" onClick={handleLogout}>
            logout
          </button>
        </div>
      )}
    </div>
  )
}

export default App
