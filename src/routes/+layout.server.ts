import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, depends }) => {

  depends("layout")

  return {
    session: await locals.getSession()
  };
};