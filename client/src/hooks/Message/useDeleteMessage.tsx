import { Api } from '@/Constants'
import { useState } from 'react'

export const useDeleteMessage = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const deleteMessage = async (deleteId: string, receiverId: string) => {
    setLoading(true)
    try {
      const res = await fetch(`${Api}/Message/chat/${deleteId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receiverId: receiverId,
        }),
        credentials: 'include',
      })

      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }
      console.log(data.message)
    } catch (error: any) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  return { deleteMessage, loading }
}
