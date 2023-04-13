import prisma from "$lib/prisma"
import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import { type Actions, type ServerLoad, fail } from "@sveltejs/kit"

export const load: ServerLoad = async () => {
  const users = await prisma.user.findMany({
    take: 10
  })
  return {
    users
  }
}

export const actions: Actions = {
  createUser: async (event) => {

    let name = (await event.request.formData()).get("name")
    if (!name) {
      return fail(400, { message: "Missing name" })
    }
    return router.createCaller(await createContext(event)).addUser({
      name: name.toString()
    })
  }
}