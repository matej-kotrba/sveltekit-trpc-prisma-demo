import prisma from "$lib/prisma"
import type { User } from "@prisma/client"
import { redirect, type Actions, type ServerLoad, fail } from "@sveltejs/kit"

export const load: ServerLoad = async ({ params }) => {
  const user = await prisma.user.findFirst({
    where: {
      name: params.id
    }
  })

  if (!user) {
    redirect(300, "/users")
  }

  return {
    user: user as User
  }
}

export const actions: Actions = {
  updateUser: async ({ request }) => {
    const data = await request.formData()
    const id = data.get("id") as String
    const name = data.get("name") as String

    // Add a new user to the users table with the given id and name
    if (!id || !name) {
      console.log("Missing id or name")
      return fail(400, { message: "Missing id or name" })
    }

    await prisma.user.update({
      where: {
        id: id.toString()
      },
      data: {
        name: name.toString()
      }
    })

    throw redirect(300, `/users/${name}`)
  },
  createPost: async ({ request }) => {
    const form = await request.formData()
    const title = form.get("title") as String
    const content = form.get("content") as String
    const authorID = form.get("authorID") as String

    const post = await prisma.post.create({
      data: {
        title: title.toString(),
        content: content.toString(),
        authorId: authorID.toString(),
      }
    })

    console.log(post)
  }
}