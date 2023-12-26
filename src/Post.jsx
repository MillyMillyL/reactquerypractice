import { useQuery } from "@tanstack/react-query";
import { getPost, getUser } from "./api";

function Post({ id }) {
  const postQuery = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  });
  const userQuery = useQuery({
    queryKey: ["users", postQuery?.data?.userId],
    enabled: !!postQuery?.data?.userId,
    queryFn: () => getUser(postQuery.data.userId),
  });

  if (postQuery.status === "pending") return <h2>Loading</h2>;
  if (postQuery.status === "error")
    return <h2>{JSON.stringify(postQuery.error)}</h2>;
  return (
    <div>
      <h2>{postQuery.data.title}</h2>
      <small>
        {userQuery.isLoading
          ? "Loading user..."
          : userQuery.isError
          ? "Error loading user"
          : userQuery.data.name}
      </small>
      <p>{postQuery.data.body}</p>
    </div>
  );
}

export default Post;
