import React, { SetStateAction } from 'react'

export const errorMessageFunc = (
  errorMessage: string,
  setError: React.Dispatch<SetStateAction<string>>
) => {
  setError(errorMessage)
  setTimeout(() => {
    setError('')
  }, 5000)
}
