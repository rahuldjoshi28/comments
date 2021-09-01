import { createContext, useContext, useEffect, useState } from "react";
import { getStorage, setStorage } from "../../utils/storage";

export const CommentsContext = createContext([]);

export function CommentsProvider({ children }) {
  const [comments, setComments] = useState(() => getStorage("comments") || []);

  const updateComments = (newComments) => {
    setComments(newComments);
  };

  useEffect(() => {
    setStorage("comments", comments);
  }, [comments]);

  const props = {
    setComments: updateComments,
    comments,
  };

  return (
    <CommentsContext.Provider value={props}>
      {children}
    </CommentsContext.Provider>
  );
}

function withReply(comments, post, trail) {
  let newComments = [...comments];
  let itr = newComments;
  trail.forEach((trailId, index) => {
    const target = itr.find(({ id }) => id === trailId);
    if (index === trail.length - 1) {
      target.replies = [...target.replies, post];
      return;
    }
    itr = target.replies;
  });
  return newComments;
}

function delComment(comments, trail) {
  if (trail.length === 1) {
    return comments.filter(({ id }) => id !== trail[0]);
  }

  let newState = [...comments];
  let itr = newState;

  for (let i = 0; i < trail.length - 1; i++) {
    newState = newState.find(({ id }) => id === trail[i]);
    if (i !== trail.length - 2) {
      newState = newState.replies;
    }
  }

  newState.replies = newState.replies.filter(
    (cmt) => cmt.id !== trail[trail.length - 1]
  );
  return itr;
}

export function useComments() {
  const { setComments, comments } = useContext(CommentsContext);

  const addReply = (newComment, trail) =>
    setComments((comments) => withReply(comments, newComment, trail));

  const addComment = (newComment) =>
    setComments((comments) => [...comments, newComment]);

  const deleteComment = (trail) => {
    setComments((comments) => delComment(comments, trail));
  };

  return { addComment, comments, addReply, deleteComment };
}
