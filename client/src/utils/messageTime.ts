export function messageTime(dateString: string) {
  const date = new Date(dateString)
  const hours = date.getHours()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const formattedHours = padZero(hours % 12 === 0 ? 12 : hours % 12)
  const minutes = padZero(date.getMinutes())

  return `${formattedHours}:${minutes} ${ampm}`
}

function padZero(number: number) {
  return number.toString().padStart(2, '0')
}

export function DetailedMessageTime(dateString: string) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const date = new Date(dateString)
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = padZero(date.getMinutes())

  return `${day} ${month} ${year}, ${padZero(hours)}:${minutes}`
}
