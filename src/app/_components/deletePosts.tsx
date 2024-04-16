"use client";

import {useRouter} from "next/navigation";
import { api } from "@/trpc/react";


export function DeleteButton() {
  const router = useRouter();
  const deleter = api.post.deleteAll.useMutation({
    onSuccess: () => {
      router.refresh();

    },
  });
  return (<button onClick={() => deleter.mutate()}>Delete All</button>)
}
