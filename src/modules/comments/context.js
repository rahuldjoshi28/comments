import { createContext, useContext, useEffect, useState } from "react";
import { getStorage, setStorage } from "../../utils/storage";

export const CommentsContext = createContext([]);

export function CommentsProvider({ children }) {
  const [comments, setComments] = useState(
    () => getStorage("comments") || []
  );

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

  return { addComment, comments, addReply };
}
