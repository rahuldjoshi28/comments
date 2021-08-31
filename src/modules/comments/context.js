import { createContext, useContext, useState } from "react";

export const CommentsContext = createContext([]);

export function CommentsProvider({ comments: initialComments = [], children }) {
  const [comments, setComments] = useState(initialComments);

  const addComment = (newComment) =>
    setComments((comments) => [...comments, newComment]);

  const props = {
    addComment,
    comments,
  };

  return (
    <CommentsContext.Provider value={props}>
      {children}
    </CommentsContext.Provider>
  );
}

export function useComments() {
  const { addComment, comments } = useContext(CommentsContext);

  return { addComment, comments };
}