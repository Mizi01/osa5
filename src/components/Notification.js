const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  var nameClass = "error"
  if (message.includes('logged')) {
    nameClass = "add"
  }

  return (
    <div className={nameClass}>
      {message}
    </div>
  )
}

export default Notification