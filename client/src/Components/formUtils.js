import axios from "axios";

function statusMessage(message, setUserHook) {
  setUserHook(message);
  setTimeout(() => {
    setUserHook(null);
  }, 3000);
  return message;
}

function sendHandler(data, messageCallback) {
  const url = "http://localhost:5000/sendimage";
  ///TODO: return messages to user about input errors
  axios
    .post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(`response: ${res}`);
    })
    .catch((err) => console.log(err));
  return messageCallback("Sending image");
}

export { statusMessage, sendHandler };
