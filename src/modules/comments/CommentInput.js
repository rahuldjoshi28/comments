import React, { useState } from "react";
import Input from "../../components/Input";
import styled from "styled-components";
import { IoSend } from "react-icons/io5";

function CommentInput({ onPost, placeholder = "Write a comment..." }) {
  const [comment, setComment] = useState("");

  const onChange = (e) => {
    setComment(e.target.value);
  };

  const handlePost = () => {
    onPost(comment);
    setComment("");
  };

  return (
    <Wrapper>
      <Input placeholder={placeholder} value={comment} onChange={onChange} />
      {comment.length > 0 && <SendButton onClick={handlePost} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SendButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <SendIcon />
    </Button>
  );
};

const SendIcon = styled(IoSend)`
  height: 20px;
  width: 20px;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;

  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;

export default CommentInput;
