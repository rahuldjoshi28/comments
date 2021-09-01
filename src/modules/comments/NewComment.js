import { useComments } from "./context";
import { getCurrentUser, getCurrentUserName } from "../user";
import { Actions } from "./actions";
import { Avatar, Image } from "../../components/Avatar";
import CommentInput from "./CommentInput";
import React from "react";
import styled from "styled-components";
import { Flex } from "../../components/Flex";
import { generateUUId } from "../../utils/uuid";

export const createNewComment = (author, commentText) => {
  return {
    commentText,
    author,
    id: generateUUId(),
    timestamp: Date.now(),
    replies: [],
    likes: {},
  };
};

export function NewComment() {
  const { dispatch } = useComments();
  const currentUSer = getCurrentUser() || {};

  const handleAdd = (post) => {
    const newComment = createNewComment(getCurrentUserName(), post);
    dispatch(Actions.addComment(newComment));
  };

  return (
    <Wrapper>
      <Avatar src={currentUSer.avatarUrl} userName={currentUSer.userName} />
      <CommentInput onPost={handleAdd} />
    </Wrapper>
  );
}

const Wrapper = styled(Flex)`
  ${Image} {
    margin-right: 10px;
  }
`;
