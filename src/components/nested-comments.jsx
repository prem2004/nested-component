import React, { useState } from "react";
import "./style.css";
import useCommentTree from "../hooks/use-comment-tree";
import Comment from "./Comment";

const NestedComments = ({
  comments,
  onSubmit = () => {},
  onEdit,
  onDelete,
  addReply,
}) => {
  const [comment, setComment] = useState("");
  const {
    comments: commentsData,
    insertComment,
    deleteComment,
    onEditSaveChanges,
  } = useCommentTree(comments);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  //for reply
  const handleReply = (commentId, content) => {
    insertComment(commentId, content);
  };

  const handleSubmit = () => {
    if (comment) {
      //write logic here
      handleReply(undefined, comment);
      setComment("");
    }
  };

  return (
    <>
      <div
        className="add-comment"
        style={{ display: "flex", alignItems: "center" }}
      >
        <textarea
          onChange={handleChange}
          value={comment}
          rows={3}
          cols={50}
          placeholder="Add new comments"
          className="comment-textarea"
        />
        <button
          style={{ padding: "15px" }}
          type="submit"
          className="comment-button"
          onClick={handleSubmit}
        >
          Add comment test
        </button>
      </div>
      {commentsData &&
        commentsData.map((item) => {
          return (
            <Comment
              key={item.id}
              comment={item}
              onSubmitComment={handleReply}
              deleteComment={deleteComment}
              onEditSaveChanges={onEditSaveChanges}
              id={item.id}
            />
          );
        })}
    </>
  );
};
export default NestedComments;
