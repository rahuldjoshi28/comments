import { getUserNames } from "./index";
import React, { useRef } from "react";
import { setStorage } from "../../utils/storage";
import { Container } from "../../components/Container";

export function UserSelection() {
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
