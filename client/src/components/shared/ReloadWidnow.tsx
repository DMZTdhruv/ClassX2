'use client'

import React, { useEffect } from 'react'

const ReloadWindow = () => {
  useEffect(() => {
    window.location.reload()
  }, [])
  return null
}

export default ReloadWindow
