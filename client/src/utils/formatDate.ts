export const formatDate = (date: Date) => {
  const now = new Date()
  const diffInMilliseconds = now.getTime() - date.getTime()

  const seconds = Math.floor(diffInMilliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) {
    return `${seconds} seconds`
  } else if (minutes < 60) {
    return `${minutes} minutes`
  } else if (hours < 24) {
    return `${hours} hours`
  } else {
    return `${days} days`
  }
}
export const formatMessageSideBarDate = (date: Date) => {
  const now = new Date()
  const diffInMilliseconds = now.getTime() - date.getTime()

  const seconds = Math.floor(diffInMilliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) {
    return `${seconds} sec`
  } else if (minutes < 60) {
    return `${minutes} m`
  } else if (hours < 24) {
    return `${hours} h`
  } else {
    return `${days} d`
  }
}
