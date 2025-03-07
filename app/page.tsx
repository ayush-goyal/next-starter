import { HydrateClient } from "trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <h1>Hello World</h1>
    </HydrateClient>
  );
}
