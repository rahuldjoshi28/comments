import styled from "styled-components";

export function CommentCard({ author, commentText, timestamp, className }) {
  return (
    <div className={className}>
      <CommentBox>
        <Author>{author}</Author>
        <CommentText>{commentText}</CommentText>
      </CommentBox>
      <ActionFooter timestamp={timestamp} />
    </div>
  );
}

function ActionFooter({ timestamp }) {
  return (
    <Ul>
      <Li>
        <LinkButton>Like</LinkButton>
      </Li>
      <Li>
        <LinkButton>Reply</LinkButton>
      </Li>
      <Li>
        <TimeStamp>{timestamp}</TimeStamp>
      </Li>
    </Ul>
  );
}

const TimeStamp = styled.p`
  color: ${({ theme }) => theme.colors.gray2};
  font-size: 12px;
  margin: 0 5px 0;
  line-height: 16px;
`;

const Ul = styled.ul`
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;
  align-items: center;
`;

const Li = styled.li`
  &:after {
    content: "\\00b7";
  }

  &:last-child:after {
    content: "";
  }
`;

const LinkButton = styled.button`
  font-style: bold;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray2};
  font-size: 12px;
`;

const CommentBox = styled.div`
  background-color: ${({ theme }) => theme.colors.gray1};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

const CommentText = styled.p`
  padding: 0;
  margin: 10px 0 0;
`;

const Author = styled.h4`
  margin: 0;
`;
