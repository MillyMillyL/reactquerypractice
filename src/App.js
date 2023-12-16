import "./App.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const POSTS = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];

function App() {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return wait(1000).then(() => [...POSTS]);
    },
    staleTime: 1000,
    // queryFn: () => Promise.reject("Error message"),
  });

  const { isLoading, data, error } = postsQuery;

  const newPostMutation = useMutation({
    mutationFn: (title) =>
      wait(1000).then(() => POSTS.push({ id: crypto.randomUUID(), title })),
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
    <div className="App">
      <h1>Tanstack Query</h1>
      {data.map((post) => (
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

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App;
