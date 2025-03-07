"use client";

import { api } from "trpc/react";

export default function Home() {
  const { data, isLoading } = api.default.getHelloWorld.useQuery({
    name: "World",
  });

  return (
    <div>
      <h1>Hello World</h1>
      <h1>{isLoading ? "Loading..." : data}</h1>
    </div>
  );
}
