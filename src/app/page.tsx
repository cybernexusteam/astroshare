import Link from "next/link";

import { CreatePost } from "@/app/_components/create-post";
import { Liker, Showcase } from "@/app/_components/showcase";
import { api } from "@/trpc/server";
import { ThumbsUpIcon } from "lucide-react";
import { DeleteButton } from "./_components/deletePosts";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#10105f] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          AstroShare ⭐
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4" >
            <h3 className="text-2xl font-bold">Share The Sky! 🌠</h3>
            <div className="text-lg">
              Share the photos of the stars! Help us create a rich database of the sky!
            </div>
          </div>
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4" >
            <h3 className="text-2xl font-bold">Explore The Galaxy! 🌌</h3>
            <div className="text-lg">
              View facinating images of stars, and find images for your astronomy needs!
            </div>
          </div>
        </div>
        {/*<div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>
        </div>*/}
        {/*<Showcase latest={<LatestShowcase />} liked={<LikedShowcase />} />*/}
        <LatestShowcase />
      </div>
      <DeleteButton />
    </main>
  );
}


async function LatestShowcase() {
  const posts = await api.post.getAllPosts();
  
  return (<>
    <ul className="w-full justify-center flex flex-wrap gap-6">
      {posts.length !== 0 ? (
        posts.map(post =>
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4" >
            <h3 className="text-2xl font-bold">{post.name}</h3>
            <div className="text-lg">{post.description}</div>
            <ul className="flex flex-wrap justify-center">
              {post.files.map((link: string) => (
                <li><img src={link}/></li>
              ))}
            </ul>
            {/*<Liker id={post.id} likes={post.likes} />
            <div className="text-lg">{post.likes}</div>*/}
          </div>)
      ) : (
        <p>You have no posts yet.</p>
      )}
    </ul>
      <CreatePost />
  </>);
}
async function LikedShowcase() {
  const posts = await api.post.getAllPostsByLiked();
  
  return (
    <ul className="w-full max-w-xs flex flex-wrap justify-center">
      {posts.length !== 0 ? (
        posts.map(post =>
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4" >
            <h3 className="text-2xl font-bold">{post.name}</h3>
            <div className="text-lg">{post.description}</div>
            <ul className="flex flex-wrap justify-center">
              {post.files.map((link: string) => (
                <li><img src={link}/></li>
              ))}
            </ul>
            <Liker id={post.id} likes={post.likes} />
            <div className="text-lg">{post.likes}</div>
          </div>)
      ) : (
        <p>You have no posts yet.</p>
      )}
      <CreatePost />
    </ul>
  );
}
