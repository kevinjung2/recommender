import { db } from "~/server/db";

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  return (
    <main>
      {posts.map((post, ind) => (
        <div key={ind}>{post.name}</div>
      ))}
      <div className="flex items-center justify-center">Recommender</div>
    </main>
  );
}
