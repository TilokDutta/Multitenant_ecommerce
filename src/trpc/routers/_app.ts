import { categoriesRouter } from '@/modules/categories/server/procedure';
import { authRouter } from '@/modules/auth/server/procedure';

import { createTRPCRouter } from '../init';
import { productsRouter } from '@/modules/products/server/procedure';

export const appRouter = createTRPCRouter({
  auth:authRouter,
  products:productsRouter,
  categories: categoriesRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;