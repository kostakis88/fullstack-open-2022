const Notification = ({message, isSuccessful}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`notification ${isSuccessful ? 'success' : 'fail'}`}>{message}</div>
  )
}

export default Notification
