"use client";
import { ReactElement, ReactNode, useState } from "react";
import {ThumbsUp} from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";

export function Showcase({latest, liked}: { latest: any, liked: any }) {
  const [isLatest, setIsLatest] = useState(true);
  if (isLatest) {
  return (
    <div>
      Sort By Latest: <input type="checkbox" checked={true} onChange={e => setIsLatest(e.target.checked)} />
      {latest}
    </div>
  );
  } else {
    
  return (
    <div>
      Sort By Latest: <input type="checkbox" checked={false} onChange={e => setIsLatest(e.target.checked)} />
      {liked}
    </div>
  );
  }
}



export function Liker({likes, id}: {likes: number, id: number}) {
  const router = useRouter();
  
  const addLike = api.post.likePost.useMutation({
    onSuccess: () => {
      router.refresh();

    },
  });
  return (<button className="flex gap-6" onClick={() => addLike.mutate({currentLikes: likes, id})}><ThumbsUp /> like!</button>);
}
