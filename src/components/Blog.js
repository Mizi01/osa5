const Blog = ({blog, handleLike, user, handleDelete}) => {

  /*console.log(`käyttäjä on ${user.name} ja id ${user}`)*/
  console.log(user)
  /*console.log(`blogin lisääjä on ${user.name} ja blogin id ${blog.user.id}`)*/
  /*window.confirm(`are you sure you want delete blog: ${blog.title}?`
  */

  return(
  <div>
    {blog.title} {blog.author} {blog.likes}
    <button onClick={() => handleLike(blog)}>like</button>
    {user !== null && blog.user.id === user.id ? <button onClick={() => handleDelete(blog)}>delete</button>:<></>}
    </div>
  )  
}

export default Blog