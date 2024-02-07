import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_ID,
  dataset: 'production',
  apiVersion: '2024-02-02',
  token: process.env.NEXT_PUBLIC_CLASSX_TOKEN,
  useCdn: false,
})

export default client
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  useCdn: false,
})

export default client