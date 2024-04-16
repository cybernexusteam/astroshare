"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";

import {UploadButton} from  "@/utils/uploadthing";

export function CreatePost() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<string[]>([]);

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
      setDescription("");
      setFiles([]);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ name, description, files });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <UploadButton endpoint="imageUploader"
        onClientUploadComplete={(res)=> {
          setFiles(res.map(x => x.url));
        }}
        onUploadError={(error: Error) => {
          alert(`Error! ${error.message}`)
        } }
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createPost.isPending}
      >
        {createPost.isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
