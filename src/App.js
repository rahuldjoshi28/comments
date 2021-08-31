import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import theme from "./theme";
import { Container } from "./components/Container";
import CommentInput from "./modules/comments/CommentInput";
import { IconContext } from "react-icons";
import { CommentsProvider, useComments } from "./modules/comments/context";
import { generateUUId, seed } from "./modules/uuid";
import { Comments } from "./modules/comments/Comments";

seed(0);

function App() {
  return (
    <IconContext.Provider value={{ className: "icon" }}>
      <ThemeProvider theme={theme}>
        <CommentsProvider>
          <PageWrapper>
            <NewComment />
            <CommentsWrapper>
              <Comments />
            </CommentsWrapper>
          </PageWrapper>
        </CommentsProvider>
      </ThemeProvider>
    </IconContext.Provider>
  );
}

const CommentsWrapper = styled.div``;

export const createNewComment = (author, commentText) => {
  return {
    commentText,
    author,
    id: generateUUId(),
    timestamp: Date.now(),
    replies: [],
  };
};

function NewComment() {
  const { addComment } = useComments();

  const handleAdd = (post) =>
    addComment(createNewComment("Random Person", post));

  return <CommentInput onPost={handleAdd} />;
}

const PageWrapper = styled(Container)`
  margin-top: 40px;
`;

export default App;
