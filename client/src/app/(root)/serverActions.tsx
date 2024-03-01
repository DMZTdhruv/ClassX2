'use server'

import { revalidateTag } from 'next/cache'

export async function deletePostFromUserPage() {
  revalidateTag('userPost')
}

export async function updateFeed() {
  revalidateTag('feedPost')
}
