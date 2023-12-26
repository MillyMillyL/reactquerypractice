import { getPosts } from "./api";
import { useQuery } from "@tanstack/react-query";

function PostsList1() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    // refetchInterval: 1000,
  });

  if (postsQuery.status === "pending") return <h1>Loading...</h1>;
  if (postsQuery.status === "error")
    return <h1>{JSON.stringify(postsQuery.error)}</h1>;

  return (
    <div>
      <h2>Posts List 1</h2>
      <ol>
        {postsQuery.data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
}

export default PostsList1;
