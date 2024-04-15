import { useEffect, useState } from "react";

import { EmojiEmotions, AttachFile, Mic } from "@mui/icons-material";
import { Box, styled, InputBase } from "@mui/material";

import { uploadFile } from "../../../service/api";

const Container = styled(Box)`
  height: 55px;
  background: #ededed;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px;
  & > * {
    margin: 5px;
    color: #919191;
  }
`;

const Search = styled(Box)`
  border-radius: 18px;
  background-color: #ffffff;
  width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
  width: 100%;
  padding: 20px;
  padding-left: 25px;
  font-size: 14px;
  height: 20px;
  width: 100%;
`;

const ClipIcon = styled(AttachFile)`
  transform: "rotate(40deg)";
`;

const Footer = ({
  sendText,
  value,
  setValue,
  setFile,
  file,
  setImage,
  sendAIText,
  sendTextOnClick,
}) => {
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setImage(response.data);
      }
    };
    getImage();
  }, [file]);

  const onFileChange = (e) => {
    setValue(e.target.files[0].name);
    setFile(e.target.files[0]);
  };

  function handleSendMessage(e) {
    if (e.key == "Enter") {
      if (e.shiftKey) {
        setValue((prevValue) => prevValue + "\n");
      } else {
        if (value.includes("send ai")) {
          sendAIText(e);
        } else {
          sendText(e);
        }
      }
    }
  }

  function handleOnChange(e) {
    setValue(e.target.value);
  }
  return (
    <Container>
      <EmojiEmotions />
      <label htmlFor="fileInput">
        <ClipIcon />
      </label>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={(e) => onFileChange(e)}
      />

      <Search>
        <InputField
          placeholder="Type a message"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => {
            handleOnChange(e);
          }}
          onKeyDown={(e) => handleSendMessage(e)}
          value={value}
          multiline
        />
      </Search>

      <button onClick={(e) => sendTextOnClick()}>send</button>
      <button onClick={(e) => sendTextOnClick()}>AI</button>
      <Mic />
    </Container>
  );
};

export default Footer;
