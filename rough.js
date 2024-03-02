const axios = require("./lib/axios");

const url = "https://notesify-server.vercel.app/user/signup";
const method = "post";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer null",
};

const data = {
  firstName: "golu",
  lastName: "gupta",
  userName: "golua",
  email: "himanshu@gmail.com",
  password: "golugupta",
};

const responseType = "json";

const response = async function () {
  const result = await axios(url, method, headers, data, responseType);
  return result;
};

response()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
