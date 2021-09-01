import "./App.css";
import styled, {ThemeProvider} from "styled-components";
import theme from "./theme";
import {Container} from "./components/Container";
import CommentInput from "./modules/comments/CommentInput";
import {IconContext} from "react-icons";
import {CommentsProvider, useComments} from "./modules/comments/context";
import {generateUUId, seed} from "./utils/uuid";
import {Comments} from "./modules/comments/Comments";
import {getCurrentUser, getCurrentUserName, getUserNames,} from "./modules/user";
import {useRef} from "react";
import {setStorage} from "./utils/storage";
import {Flex} from "./components/Flex";

seed(0);

function App() {
  return (
    <>
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
      <UserSelectionWrapper>
        <UserSelection />
      </UserSelectionWrapper>
    </>
  );
}

const UserSelectionWrapper = styled.div`
  margin-top: 400px;
`;

function UserSelection() {
  const users = getUserNames();
  const ref = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedUser = ref.current.value;
    setStorage("currentUser", selectedUser);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <select ref={ref}>
          {users.map((userName) => (
            <option key={userName} value={userName}>
              {userName}
            </option>
          ))}
        </select>
        <button type={"submit"}>Select</button>
      </form>
    </Container>
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
  const currentUSer = getCurrentUser() || {};

  const handleAdd = (post) =>
    addComment(createNewComment(getCurrentUserName(), post));

  return (
    <Wrapper>
      <Avatar src={currentUSer.avatarUrl} userName={currentUSer.userName} />
      <CommentInput onPost={handleAdd} />
    </Wrapper>
  );
}

export function Avatar({ src, userName, className }) {
  return <Image src={src} alt={userName} className={className} />;
}
const Image = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
`;

const Wrapper = styled(Flex)`
  ${Image} {
    margin-right: 10px;
  }
`;

const PageWrapper = styled(Container)`
  margin-top: 40px;
`;

export default App;
