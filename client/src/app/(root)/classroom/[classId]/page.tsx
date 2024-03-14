import React from 'react'

const page = ({ params }: { params: { classId: string } }) => {
  return <div>Welcome to class {params.classId}</div>
}

export default page
