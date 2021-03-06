import styled from "styled-components";
import { useRef, useState } from "react";
import CommentInput from "./CommentInput";
import { useComments } from "./context";
import { getCurrentUser, getCurrentUserName, getUserDetails } from "../user";
import { Flex } from "../../components/Flex";
import { formatTimePassed } from "../../utils/time";
import { Actions } from "./actions";
import { Avatar } from "../../components/Avatar";
import { createNewComment } from "./NewComment";
import { IoCloseOutline } from "react-icons/io5";

export function CommentCard({
  author,
  commentText,
  timestamp,
  className,
  id,
  trail = [],
  replies,
  likes,
}) {
  const [reply, setReply] = useState(false);
  const innerRef = useRef();
  const { dispatch } = useComments();

  const handleReply = (post) => {
    const newComment = createNewComment(getCurrentUserName(), post);
    dispatch(Actions.replyComment(newComment, trail));
  };

  const authorDetails = getUserDetails(author);
  const currentUser = getCurrentUserName();

  const handleDelete = () => dispatch(Actions.deleteComment(trail));

  const handleLike = () => dispatch(Actions.likeComment(trail, currentUser));

  const showReply = () => {
    setReply(true);
    innerRef.current?.focus();
  };

  return (
    <Wrapper className={className}>
      <Avatar src={authorDetails.avatarUrl} userName={authorDetails.userName} />
      <CommentWrapper>
        <CommentBox>
          <Author>{authorDetails.displayName}</Author>
          <CommentText>{commentText}</CommentText>
        </CommentBox>
        <ActionFooter
          timestamp={timestamp}
          onReply={showReply}
          onDelete={handleDelete}
          likes={likes}
          onLike={handleLike}
        />
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
          <ReplyInput
            onPost={handleReply}
            onClose={() => setReply(false)}
            innerRef={innerRef}
          />
        )}
      </CommentWrapper>
    </Wrapper>
  );
}

const CommentWrapper = styled.div`
  width: 100%;
`;

const Wrapper = styled(Flex)`
  img {
    margin-right: 10px;
  }
  margin-top: 10px;
`;

const ReplyWrapper = styled.div``;

function ReplyInput({ onPost, onClose, innerRef }) {
  const currentUser = getCurrentUser();

  const handlePost = (e) => {
    onPost(e);
    innerRef.current.focus();
  };

  return (
    <InputWrapper>
      <Avatar src={currentUser.avatarUrl} userName={currentUser.userName} />
      <ReplyInputWrapper>
        <CommentInput
          placeholder={"Write a reply..."}
          onPost={handlePost}
          ref={innerRef}
        />
        <CloseButton onClick={onClose}>
          <CloseReply />
        </CloseButton>
      </ReplyInputWrapper>
    </InputWrapper>
  );
}

const CloseButton = styled.button`
  border: none;
  background-color: transparent;
`;

const ReplyInputWrapper = styled(Flex)`
  align-items: center;
  flex-grow: 1;
`;

const CloseReply = styled(IoCloseOutline)`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const InputWrapper = styled(Flex)`
  margin-top: 10px;

  img {
    margin-right: 10px;
  }
`;

function ActionFooter({ timestamp, onReply, onDelete, onLike, likes }) {
  const currentUser = getCurrentUserName();
  const liked = likes[currentUser];
  const numberOfLikes = Object.keys(likes).length;

  return (
    <Ul>
      <Li>
        <LikeButton liked={liked} onClick={onLike}>
          {numberOfLikes === 0 ? "Like" : `${numberOfLikes} Likes`}
        </LikeButton>
      </Li>
      <Li>
        <LinkButton onClick={onReply}>Reply</LinkButton>
      </Li>
      <Li>
        <LinkButton onClick={onDelete}>Delete</LinkButton>
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
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray2};
  font-size: 12px;
`;

const LikeButton = styled(LinkButton)`
  color: ${({ theme, liked }) =>
    liked ? theme.colors.gray3 : theme.colors.gray2};
`;

const CommentBox = styled.div`
  background-color: ${({ theme }) => theme.colors.gray1};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 12px;
  width: fit-content;
  min-width: 180px;
`;

const CommentText = styled.p`
  padding: 0;
  margin: 10px 0 0;
`;

const Author = styled.h4`
  margin: 0;
`;
