import { useState } from 'react' 

const BlogForm = ({ createBlog }) => {
    const [newBlogAuthor, setNewBlogAuthor] = useState('')
    const [newBlogTitle, setNewBlogTitle] = useState('')
    const [newBlogUrl, setNewBlogUrl] = useState('')

    const handleBlogAuthorChange = (event) => {
        setNewBlogAuthor(event.target.value)
    }

    const handleBlogTitleChange = (event) => {
        setNewBlogTitle(event.target.value)
    }

    const handleBlogUrlChange = (event) => {
        setNewBlogUrl(event.target.value)
      }


const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      author: newBlogAuthor,
      title: newBlogTitle,
      url: newBlogUrl,
    })
    setNewBlogAuthor('')
    setNewBlogTitle('')
    setNewBlogUrl('')
  }

return(
    <form onSubmit={addBlog}>
      <div>
      Author: <input
        value={newBlogAuthor}
        onChange={handleBlogAuthorChange}/>
      </div>
      <div>Title: <input
        value={newBlogTitle}
        onChange={handleBlogTitleChange}/>
      </div>
      <div>Url: <input
        value={newBlogUrl}
        onChange={handleBlogUrlChange}/>
      </div>
      <button type="submit">save</button>
    </form>
  )
}


export default BlogForm