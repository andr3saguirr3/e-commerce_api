import { Hono } from "hono";
import prisma from '../lib/prisma.js';

const CategoryRouter = new Hono();

CategoryRouter.get("/", async (c) => {
  const categories = await prisma.category.findMany();
  return c.json(categories);
});

CategoryRouter.get("/:name", async (c) => {
  const { name } = c.req.param();
  const category = await prisma.category.findUnique({
    where: {
      name: name,
    },
  });
  return c.json(category);
});

export default CategoryRouter;