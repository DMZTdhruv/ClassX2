export function messageTime(dateString: string) {
  const date = new Date(dateString);
  const hours = date.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = padZero(hours % 12 === 0 ? 12 : hours % 12);
  const minutes = padZero(date.getMinutes());

  return `${formattedHours}:${minutes} ${ampm}`;
}

function padZero(number: number) {
  return number.toString().padStart(2, '0');
}
