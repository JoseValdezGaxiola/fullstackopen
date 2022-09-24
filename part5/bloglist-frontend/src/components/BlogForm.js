import { useState } from 'react'


const BlogForm = ({ createBlog }) => {

  const initialValues = {
    title: '',
    author: '',
    url: ''
  }

  const [values,  setValues] = useState(initialValues)



  const handleBlogChange = (event) => {

    const { name, value } = event.target
    setValues({
      ...values,
      [name]: value,
    })

  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({

      title: values.title,
      author: values.author,
      url: values.url

    })

    setValues(initialValues)
  }




  return (

    <form onSubmit={addBlog}>
        Title: <input id='title' value={values.title} onChange={handleBlogChange} name="title" /> <br/>
        Author: <input id='author' value={values.author} onChange={handleBlogChange} name="author" /> <br/>
        URL: <input id='url' value={values.url} onChange={handleBlogChange} name="url" /> <br/>
      <button type="submit">save</button>
    </form>


  )

}
export default BlogForm