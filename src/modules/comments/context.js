import { createContext, useContext, useEffect, useReducer } from "react";
import { getStorage, setStorage } from "../../utils/storage";
import { reducer } from "./reducer";

export const CommentsContext = createContext([]);

export function CommentsProvider({ children }) {
  const [comments, dispatch] = useReducer(
    reducer,
    undefined,
    () => getStorage("comments") || []
  );

  useEffect(() => {
    setStorage("comments", comments);
  }, [comments]);

  const props = {
    dispatch,
    comments,
  };

  return (
    <CommentsContext.Provider value={props}>
      {children}
    </CommentsContext.Provider>
  );
}

export function useComments() {
  const { dispatch, comments } = useContext(CommentsContext);

  return { comments, dispatch };
}
