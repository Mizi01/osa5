const Notification = ({ message, messageClass }) => {
  if (message === null) {
    return null
  }

  /*var nameClass = "error"
  if (message.includes('logged')) {
    nameClass = "add"
  }*/

  return (
    <div className={messageClass}>
      {message}
    </div>
  )
}

export default Notification