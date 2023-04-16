import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  console.log("aaaaaaa")
  return {
    session: await event.locals.getSession()
  };
};