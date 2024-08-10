import React, { useState } from "react";

const useCommentTree = (initialComments) => {
  const [comments, setComments] = useState(initialComments);

  const insertNode = (tree, commentId, content) => {
    return tree.map((post) => {
      if (post.id === commentId) {
        return {
          ...post,
          replies: [...post.replies, content],
        };
      } else if (post.replies && post.replies.length > 0) {
        return {
          ...post,
          replies: insertNode(post.replies, commentId, content),
        };
      }
      return post;
    });
  };

  const insertComment = (commentId, content) => {
    const newComment = {
      id: Date.now,
      content,
      vote: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    if (commentId) {
      setComments((previouscomment) =>
        insertNode(previouscomment, commentId, newComment)
      );
    } else {
      setComments((previouscomment) => [newComment, ...previouscomment]);
    }
  };

  const deleteNestedComments = (prevComment, commentId) => {
    return prevComment.reduce((ac, currentval) => {
      if (currentval.id == commentId) {
        return [...ac];
      } else if (currentval.replies.length > 0) {
        return [
          ...ac,
          {
            ...currentval,
            replies: deleteNestedComments(currentval.replies, commentId),
          },
        ];
      }
      return [...ac, currentval];
    }, []);
  };

  const deleteComment = (commentId) => {
    setComments((previousComments) =>
      deleteNestedComments(previousComments, commentId)
    );
  };

  const fineCommentAndupdatEdited = (tree, commentId, contentvalue) => {
    return tree.map((item) => {
      if (item.id === commentId) {
        return {
          ...item,
          content: contentvalue,
        };
      } else if (item.replies.length > 0) {
        return {
          ...item,
          replies: fineCommentAndupdatEdited(
            item.replies,
            commentId,
            contentvalue
          ),
        };
      }
      return item;
    });
  };

  //onEdit save
  const onEditSaveChanges = (commentId, contentvalue) => {
    if (commentId) {
      setComments((previouscomment) =>
        fineCommentAndupdatEdited(previouscomment, commentId, contentvalue)
      );
    }
  };

  return { comments, insertComment, deleteComment, onEditSaveChanges };
};

export default useCommentTree;
