import { useState } from 'react'

const Blog = ({ blog, updateBlog,deleteBlog, username }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const handleBlogUpdate = () => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    updateBlog(blog.id, blogToUpdate)
  }

  const handleDelete = () => {

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }


  return (
    <div className='blog'>

      <div>
        <p className="title">{blog.title} -- </p>
        <p className="author">{blog.author} --</p>
        <button id='show-button' onClick={toggleVisibility}>
          {visible ? 'hide' : 'show'}

        </button>
      </div>

      {visible && (

        <div className="blog-details">
          <div>{blog.url}</div>
          <div>
      Likes: {blog.likes}
            <button id="like-button"  onClick={handleBlogUpdate}>
       like
            </button>
          </div>



          <div>{blog.user.name}</div>
          {blog.user.username === username && (
            <button id="delete-button"  onClick={handleDelete}>
              delete
            </button>
          )}
        </div>
      )}

    </div>



  )



}
export default Blog