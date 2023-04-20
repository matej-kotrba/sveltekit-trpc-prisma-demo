import type { ServerLoad } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export const load: ServerLoad = async ({ params }) => {
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      content: true,
      author: true
    }
  })
  console.log(posts)
  return {
    posts
  }
}