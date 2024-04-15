export default {
  name: 'classwork',
  title: 'Classwork',
  type: 'document',
  fields: [
    {
      name: 'file',
      title: 'File',
      type: 'file',
      options: {
        accept: ['.pdf', '.docx', '.ppt', '.mp4'], 
      },
    },
  ],
}
