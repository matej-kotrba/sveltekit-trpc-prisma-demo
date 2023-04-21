import type { ServerLoad } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export const load: ServerLoad = async ({ params }) => {
  // Getting posts from MongoDB
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