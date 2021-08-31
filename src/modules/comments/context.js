import { createContext, useContext, useState } from "react";
import { createNewComment } from "../../App";

export const CommentsContext = createContext([]);

export function CommentsProvider({ comments: initialComments = [], children }) {
  const [comments, setComments] = useState(initialComments);

  const props = {
    setComments,
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
  let current = newComments;
  trail.forEach((trailId, index) => {
    const target = current.find(({ id }) => id === trailId);
    if (index === trail.length - 1) {
      target.replies = [...target.replies, post];
      return;
    }
    current = target.replies;
  });
  return newComments;
}

export function useComments() {
  const { setComments, comments } = useContext(CommentsContext);

  const addReply = (newComment, trail) =>
    setComments((comments) => withReply(comments, newComment, trail));

  const addComment = (newComment) =>
    setComments((comments) => [...comments, newComment]);

  console.log(comments);

  return { addComment, comments, addReply };
}
