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
  }
}