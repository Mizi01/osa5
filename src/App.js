import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUsername('')
      setPassword('')
      setMessage(`Welcome ${user.name}`)
      setMessageClass('add')
      setTimeout(() => {
        setMessage(null)
        setMessageClass('')
      }, 5000)
    } catch (exception) {
      setMessage('Wrong credentials')
      setMessageClass('error')
      setTimeout(() => {
        setMessage(null)
        setMessageClass('')
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`Added blog  ${returnedBlog.title} by ${returnedBlog.author}`)
      setMessageClass('add')
      setTimeout(() => {
        setMessage(null)
        setMessageClass('')
      }, 5000)
    })
  }

  /*const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
          Username: <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
          Password: <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type="submit">login</button>
    </form>      
  )*/



  const logOutForm = () => (
    <form onSubmit={logOut}>
      <button type="submit">logout</button>
    </form>
  )

  const logOut = () => {
    console.log("joo")
    window.localStorage.clear()
  }

  const blogFormRef = useRef()

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} messageClass={messageClass}/>
      {user === null ? 
      <Togglable buttonLabel="login">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
          />
      </Togglable> :
      <div>
        <p>{user.name} logged in</p>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        {logOutForm()}
        </div>
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
