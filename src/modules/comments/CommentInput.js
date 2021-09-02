import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Input from "../../components/Input";
import styled from "styled-components";
import { IoSend } from "react-icons/io5";

const CommentInput = forwardRef((props, innerRef) => {
  const { onPost, placeholder = "Write a comment...", className } = props;

  const [comment, setComment] = useState("");
  const inputRef = useRef();

  const onChange = (e) => {
    setComment(e.target.value);
  };

  const handlePost = () => {
    onPost(comment);
    setComment("");
  };

  useImperativeHandle(innerRef, () => ({
    focus: () => inputRef.current.focus(),
  }));

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Wrapper className={className} ref={innerRef}>
      <Input
        ref={inputRef}
        placeholder={placeholder}
        value={comment}
        onChange={onChange}
      />
      {comment.length > 0 && <SendButton onClick={handlePost} />}
    </Wrapper>
  );
});

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

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export default CommentInput;
