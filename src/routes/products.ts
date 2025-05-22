import { Hono } from "hono";
import prisma from '../lib/prisma.js';

const ProductRouter = new Hono();

ProductRouter.get("/", async (c) => {
  const products = await prisma.product.findMany();
  return c.json(products);
});

ProductRouter.get("/:id", async (c) => {
  const { id } = c.req.param();
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
  return c.json(product);
});

ProductRouter.get("/category/:categoryID", async (c) => {
  const { categoryID } = c.req.param();
  const products = await prisma.product.findMany({
    where: {
      categoryId: categoryID,
    },
    include: {
      images: true,
      Category: true, // si también quieres la info de la categoría
    },
  });
  return c.json(products);
});



export default ProductRouter;