import { useState } from "react";
import PostsList1 from "./PostsList1";
import QueryBasics from "./QueryBasics";
import Post from "./Post";
import PostListPaginated from "./PostListPaginated";
import PostListInfinite from "./PostListInfinite";
import { useQueryClient } from "@tanstack/react-query";
import { getPost } from "./api";

function App() {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />);
  const queryClient = useQueryClient();

  function onHoverPostOneLink() {
    queryClient.prefetchQuery({
      queryKey: ["posts", 1],
      queryFn: () => getPost(1),
    });
  }

  return (
    <div className="App">
      <h1>Tanstack Query</h1>
      <div>
        <button onClick={() => setCurrentPage(<PostsList1 />)}>
          Posts List 1
        </button>

        <button
          onClick={() =>
            setCurrentPage(<QueryBasics setCurrentPage={setCurrentPage} />)
          }
        >
          React Query Basics
        </button>
        <button
          onMouseEnter={onHoverPostOneLink}
          onClick={() => setCurrentPage(<Post id={1} />)}
        >
          First Post
        </button>
        <button onClick={() => setCurrentPage(<PostListPaginated />)}>
          Post List Paginated
        </button>
        <button onClick={() => setCurrentPage(<PostListInfinite />)}>
          Post List Infinite
        </button>
      </div>
      <div>{currentPage}</div>
    </div>
  );
}

export default App;
