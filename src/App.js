import { useState } from "react";
import PostsList1 from "./PostsList1";
import PostsList2 from "./PostsList2";
import QueryBasics from "./QueryBasics";

function App() {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />);

  return (
    <div className="App">
      <h1>Tanstack Query</h1>
      <div>
        <button onClick={() => setCurrentPage(<PostsList1 />)}>
          Posts List 1
        </button>
        <button onClick={() => setCurrentPage(<PostsList2 />)}>
          Posts List 2
        </button>
        <button onClick={() => setCurrentPage(<QueryBasics />)}>
          React Query Basics
        </button>
      </div>
      <div>{currentPage}</div>
    </div>
  );
}

export default App;
