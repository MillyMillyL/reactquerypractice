import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getPostsPaginated } from "./api";

function PostListPaginated() {
  const [page, setPage] = useState(1);

  const { status, error, data, isPreviousData } = useQuery({
    queryKey: ["posts", { page }],
    keepPreviousData: true,
    queryFn: () => getPostsPaginated(page),
  });

  if (status === "pending") return <h2>Loading...</h2>;
  if (status === "error") return <h2>{JSON.stringify(error)}</h2>;
  return (
    <div>
      <h2>Post List Paginated</h2>
      <small>{isPreviousData && "Previous Data"}</small>
      {data.posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
      {data.previousPage && (
        <button onClick={() => setPage(data.previousPage)}>Previous</button>
      )}
      {data.nextPage && (
        <button onClick={() => setPage(data.nextPage)}>Next</button>
      )}
    </div>
  );
}

export default PostListPaginated;
