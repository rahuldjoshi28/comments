import styled from "styled-components";
import { useState } from "react";
import CommentInput from "./CommentInput";
import { createNewComment } from "../../App";
import { useComments } from "./context";

export function CommentCard({
  author,
  commentText,
  timestamp,
  className,
  id,
  trail = [],
  replies,
}) {
  const [reply, setReply] = useState(false);
  const { addReply } = useComments();
  const handleReply = (post) => {
    addReply(createNewComment("ASDASD", post), [...trail]);
  };

  return (
    <div className={className}>
      <CommentBox>
        <Author>{author}</Author>
        <CommentText>{commentText}</CommentText>
      </CommentBox>
      <ActionFooter timestamp={timestamp} onReply={() => setReply(true)} />
      {replies.length > 0 && (
        <ReplyWrapper>
          {replies.map((reply) => (
            <CommentCard
              key={reply.id}
              {...reply}
              trail={[...trail, reply.id]}
            />
          ))}
        </ReplyWrapper>
      )}
      {reply && (
        <ReplyInput placeholder={"Write a reply..."} onPost={handleReply} />
      )}
    </div>
  );
}

const ReplyWrapper = styled.div`
  margin-left: 20px;
`;

const ReplyInput = styled(CommentInput)`
  margin-top: 10px;
`;

const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_SECOND = 1000;

const DateUtils = {
  toDays(seconds) {
    return Math.floor(
      seconds / (HOURS_IN_DAY * MINUTES_IN_HOUR * SECONDS_IN_MINUTE)
    );
  },
  toHours(seconds) {
    return Math.floor(seconds / (MINUTES_IN_HOUR * SECONDS_IN_MINUTE));
  },
  toMinutes(seconds) {
    return Math.floor(seconds / SECONDS_IN_MINUTE);
  },
  toSeconds(milliseconds) {
    return milliseconds / MILLISECONDS_IN_SECOND;
  },
};

function formatTimePassed(timestamp) {
  const currentTime = Date.now();

  const differentInSeconds = DateUtils.toSeconds(currentTime - timestamp);

  const days = DateUtils.toDays(differentInSeconds);
  if (days > 0) return `${days} d`;

  const hours = DateUtils.toHours(differentInSeconds);
  if (hours > 0) return `${hours} h`;

  const minutes = DateUtils.toMinutes(differentInSeconds);
  if (minutes > 0) return `${minutes} m`;

  return "a few seconds ago";
}

function ActionFooter({ timestamp, onReply }) {
  return (
    <Ul>
      <Li>
        <LinkButton>Like</LinkButton>
      </Li>
      <Li>
        <LinkButton onClick={onReply}>Reply</LinkButton>
      </Li>
      <Li>
        <TimeStamp>{formatTimePassed(timestamp)}</TimeStamp>
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
  width: fit-content;
`;

const CommentText = styled.p`
  padding: 0;
  margin: 10px 0 0;
`;

const Author = styled.h4`
  margin: 0;
`;
