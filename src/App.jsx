import { useEffect, useState } from "react";
import NestedComments from "./components/nested-comments";
import data from "./data/comment.json";
import componentsData from "./data/comment.json";

function App() {
  const onSubmit = () => {};

  return (
    <>
      <h1>Nested comment system</h1>
      <NestedComments
        comments={componentsData}
        onSubmit={onSubmit}
        onEdit={() => {}}
        onDelete={() => {}}
        onUpvote={() => {}}
        onDownvote={() => {}}
      />
    </>
  );
}

export default App;
