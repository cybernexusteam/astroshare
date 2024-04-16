import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { posts } from "@/server/db/schema";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      description: z.string().min(10),
      files: z.array(z.string())
    }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      //await new Promise((resolve) => setTimeout(resolve, 1000));

      await ctx.db.insert(posts).values({
        name: input.name,
        description: input.description,
        files: input.files
      });
    }),
  deleteAll: publicProcedure.mutation(async ({ctx}) => {
    await ctx.db.delete(posts);
  }),
  getAllPosts: publicProcedure.query(({ctx}) => {
    return ctx.db.query.posts.findMany({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    })
  }),
  getAllPostsByLiked: publicProcedure.query(({ctx}) => {
    return ctx.db.query.posts.findMany({
      orderBy: (posts, { desc }) => [desc(posts.likes)],
    })
  }),
  likePost: publicProcedure
    .input(z.object({
      currentLikes: z.number(),
      id: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      //await new Promise((resolve) => setTimeout(resolve, 1000));

      await ctx.db.update(posts).set(input.currentLikes+1).where(eq(posts.id, input.id));
    }),
  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.posts.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
  }),
});
