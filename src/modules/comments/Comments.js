import {useComments} from "./context";
import styled from "styled-components";
import {CommentCard} from "./CommentCard";

export function Comments({ trail = [] }) {
  const { comments } = useComments();

  return (
    <Wrapper>
      {comments.map(({ id, ...rest }) => {
        return <StyledComment key={id} {...rest} />;
      })}
    </Wrapper>
  );
}

const StyledComment = styled(CommentCard)`
  margin-top: 10px;
`;

const Wrapper = styled.div`
  margin-top: 20px;
  width: fit-content;
`;

