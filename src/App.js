import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "./theme";
import { Container } from "./components/Container";
import { IconContext } from "react-icons";
import { CommentsProvider } from "./modules/comments/context";
import { Comments } from "./modules/comments/Comments";
import { UserSelection } from "./modules/user/UserSelection";
import { NewComment } from "./modules/comments/NewComment";

function App() {
  return (
    <>
      <IconContext.Provider value={{ className: "icon" }}>
        <ThemeProvider theme={theme}>
          <CommentsProvider>
            <PageWrapper>
              <NewComment />
              <div>
                <Comments />
              </div>
            </PageWrapper>
          </CommentsProvider>
        </ThemeProvider>
      </IconContext.Provider>
      <UserSelectionWrapper>
        <UserSelection />
      </UserSelectionWrapper>
    </>
  );
}

const UserSelectionWrapper = styled.div`
  margin-top: 400px;
`;

const PageWrapper = styled(Container)`
  margin-top: 40px;
`;

export default App;
