import React, { useState } from "react";
import commentdata from "../data/comment.json";

const Comment = ({
  comment,
  onSubmitComment,
  deleteComment,
  onEditSaveChanges,
}) => {
  const [expand, setExpand] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [edit, setEdit] = useState(false);
  const [editvalue, setEditvalue] = useState("");

  const replyClick = () => {
    setExpand(!expand);
  };

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  // submit reply save
  const handleReplySubmit = (id) => {
    if (replyContent) {
      //add the logic
      onSubmitComment(comment.id, replyContent);
      setReplyContent("");
    }
    //onSubmitComment(id, replyContent);
  };

  const deleteCommentTest = () => {
    deleteComment(comment.id);
  };

  const cancelEdit = () => {
    setEdit(false);
  };

  const onEditbuttonClik = () => {
    setEditvalue(comment.content);
    setEdit(!edit);
  };

  const handleEditOnChnage = (e) => {
    setEditvalue(e.target.value);
  };

  const onEditedSave = (e) => {
    onEditSaveChanges(comment.id, editvalue);
    setEdit(!edit);
  };

  return (
    <div style={{ background: "rgb(34,193,195)" }} className="comment">
      <div>
        <p style={{ fontWeight: 600 }}>{comment.content}</p>
        <p>vote: {comment.votes}</p>
        <p>Time:{new Date(comment.timestamp).toLocaleTimeString()}</p>
      </div>
      <div style={{ paddingBottom: "20px" }} className="comment-actions">
        <button type="button" className="comment-button" onClick={replyClick}>
          Reply
        </button>
        <button
          onClick={onEditbuttonClik}
          type="button"
          className="comment-button"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={deleteCommentTest}
          className="comment-button"
        >
          Delete
        </button>
      </div>
      {edit && (
        <div style={{ paddingBottom: "20px" }}>
          <input
            value={editvalue}
            onChange={handleEditOnChnage}
            style={{ padding: "20px", width: "30vw" }}
            type="text"
          />
          <button
            onClick={onEditedSave}
            style={{ padding: "20px", width: "20vw", marginLeft: "10px" }}
            type="button"
          >
            Save Edited comments
          </button>
          <button
            onClick={cancelEdit}
            style={{ padding: "20px", width: "20vw", marginLeft: "10px" }}
            type="button"
          >
            Cancel
          </button>
        </div>
      )}
      {expand && (
        <div>
          <div style={{ paddingBottom: "20px" }}>
            <input
              value={replyContent}
              onChange={handleReplyChange}
              style={{ padding: "20px", width: "30vw" }}
              type="text"
            />
            <button
              onClick={handleReplySubmit}
              style={{ padding: "20px", width: "20vw", marginLeft: "10px" }}
              type="button"
            >
              SubmitReply
            </button>
          </div>
          {comment?.replies?.map((reply) => {
            return (
              <div style={{ marginLeft: "30px", background: "red" }}>
                <Comment
                  onSubmitComment={onSubmitComment}
                  key={reply.id}
                  comment={reply}
                  deleteComment={deleteComment}
                  onEditSaveChanges={onEditSaveChanges}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Comment;
