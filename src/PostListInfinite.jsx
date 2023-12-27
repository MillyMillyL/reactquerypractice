import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostsPaginated } from "./api";

function PostListInfinite() {
  const {
    status,
    error,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", "infinite"],
    getNextPageParam: (prevData) => prevData.nextPage,
    queryFn: ({ pageParam = 1 }) => getPostsPaginated(pageParam),
  });

  if (status === "pending") return <h2>Loading...</h2>;
  if (status === "error") return <h2>{JSON.stringify(error)}</h2>;
  return (
    <div>
      <h2>Post List Infinite</h2>
      {data.pages
        .flatMap((data) => data.posts)
        .map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      {hasNextPage && (
        <button onClick={fetchNextPage}>
          {isFetchingNextPage ? "Loading...." : "Load More"}
        </button>
      )}
    </div>
  );
}

export default PostListInfinite;
