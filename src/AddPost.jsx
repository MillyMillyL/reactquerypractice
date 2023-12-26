import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPost } from "./api";
import { useRef } from "react";
import Post from "./Post";

function AddPost({ setCurrentPage }) {
  const titleRef = useRef();
  const bodyRef = useRef();

  const queryClient = useQueryClient();
  const newPostMutation = useMutation({
    mutationFn: addPost,
    onSuccess: (data, variables, context) => {
      console.log(context);
      queryClient.invalidateQueries(["posts"], { exact: true });
      console.log(data);
      setCurrentPage(<Post id={data.id} />);
      queryClient.setQueryData(["posts", data.id], data);
    },
    onError: (error, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
    onMutate: (variables) => {
      return { hi: "Bye" };
    },
  });

  // Any time you do a mutation, you're almost always going to want to invalidate any query related to that mutation because you're obviously changing the data of that query
  //   context is something you can save and store across all of your different mutates
  //   variables are the same variables we pass to the mutation function
  //   onMutate: this is where you setup the context. It is called before the mutate function was called

  function handleSubmit(e) {
    e.preventDefault();
    newPostMutation.mutate({
      title: titleRef.current.value,
      body: bodyRef.current.value,
    });
    titleRef.current.value = "";
    bodyRef.current.value = "";
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" ref={titleRef} />
        <input type="text" placeholder="body" ref={bodyRef} />
        <button disabled={newPostMutation.isPending}>
          {newPostMutation.isPending ? "Loading" : "Add New"}
        </button>
      </form>
    </div>
  );
}

export default AddPost;
