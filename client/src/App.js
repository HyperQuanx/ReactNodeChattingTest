import io from "socket.io-client";
import { useState } from "react";
import Chat from "./components/Chat";
import styled from "styled-components";

const socket = io.connect("http://localhost:4000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const joinRoom = (e) => {
    e.preventDefault();
    if (username !== "" && room !== "") {
      socket.emit("join_room", { room, username });
      setShowChat(true);
    } else {
      setErrorMsg("입력.");
    }
  };

  return (
    <ChatApp>
      {!showChat ? (
        <ChatContainer>
          <ChatTitle>chattingTest</ChatTitle>
          <ChatInput
            type="text"
            placeholder="이름"
            onChange={(e) => {
              setErrorMsg("");
              setUsername(e.target.value);
            }}
          />
          <ChatInput
            type="text"
            placeholder="방"
            onChange={(e) => {
              setErrorMsg("");
              setRoom(e.target.value);
            }}
          />
          <ErrorMessage>{errorMsg}</ErrorMessage>
          <ChatButton onClick={joinRoom}>ㄱ</ChatButton>
        </ChatContainer>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </ChatApp>
  );
}

export default App;

const ChatApp = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fff;
  color: #212121;
  display: grid;
  place-items: center;
`;

const ChatContainer = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  border: 1px solid #057cfc;
  border-radius: 6px;
  padding: 10px;
  width: 300px;
`;
const ChatTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #057cfc;
`;
const ChatInput = styled.input`
  height: 35px;
  margin: 7px;
  border: 2px solid #057cfc;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
`;

const ErrorMessage = styled.p`
  color: red;
  height: 10px;
  font-size: 0.8rem;
`;

const ChatButton = styled.button`
  width: 200px;
  height: 50px;
  margin: 10px auto;
  border: none;
  border-radius: 5px;
  padding: 5px;
  font-size: 16px;
  background: #057cfc;
  color: #fff;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    background: rgb(35, 65, 89);
    transition: all 0.5s;
  }
  &:active {
    font-size: 0.8rem;
  }
`;
