import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts } from "./api";
import { addPost } from "./api";

function QueryBasics() {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime: 10000,
    // queryFn: () => Promise.reject("Error message"),
  });

  // /posts   ['posts']
  // /posts/1  ["posts", post.id]
  // /posts?authorId=1  ["posts", {authorId:1}]
  // /posts/2/comments  ["posts", post.id, "comments"]
  // whenever you pass data like a postId or an authorId into your queryKey, you want to make sure that whatever function you define actually use that data. that way you can make sure that your actual key and the thing that you're querying are synced up together. When you need to do some type of invalidation, you are invalidating all the queries that have that paticular key.
  // The query function must always return a promise because of asynchronous data. the function hava access to the queryKey

  const { isLoading, data: posts, error } = postsQuery;

  const newPostMutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <pre>{JSON.stringify(error)}</pre>;
  }
  return (
    <div>
      {" "}
      <h2>React Query Basics</h2>
      {posts.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
      <button
        disabled={newPostMutation.isPending}
        onClick={() => newPostMutation.mutate("new")}
      >
        Add New
      </button>
    </div>
  );
}

export default QueryBasics;
