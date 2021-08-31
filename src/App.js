import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import theme from "./theme";
import { Container } from "./components/Container";
import CommentInput from "./modules/comments/CommentInput";
import { IconContext } from "react-icons";

function App() {
  const postComment = (a) => console.log("POST ", a);

  return (
    <IconContext.Provider value={{ className: "icon" }}>
      <ThemeProvider theme={theme}>
        <PageWrapper>
          <CommentInput onPost={postComment} />
        </PageWrapper>
      </ThemeProvider>
    </IconContext.Provider>
  );
}

const PageWrapper = styled(Container)`
  margin-top: 40px;
`;

export default App;
